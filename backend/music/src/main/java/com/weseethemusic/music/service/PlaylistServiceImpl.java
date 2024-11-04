package com.weseethemusic.music.service;

import com.weseethemusic.music.common.entity.Album;
import com.weseethemusic.music.common.entity.Artist;
import com.weseethemusic.music.common.entity.Music;
import com.weseethemusic.music.common.entity.Playlist;
import com.weseethemusic.music.common.entity.PlaylistMusic;
import com.weseethemusic.music.common.service.PresignedUrlService;
import com.weseethemusic.music.dto.playlist.ArtistResponse;
import com.weseethemusic.music.dto.playlist.CreatePlaylistRequest;
import com.weseethemusic.music.dto.playlist.PlaylistMusicResponse;
import com.weseethemusic.music.dto.playlist.PlaylistResponse;
import com.weseethemusic.music.repository.ArtistMusicRepository;
import com.weseethemusic.music.repository.MusicRepository;
import com.weseethemusic.music.repository.PlaylistMusicRepository;
import com.weseethemusic.music.repository.PlaylistRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;
    private final MusicRepository musicRepository;
    private final PresignedUrlService presignedUrlService;
    private final ArtistMusicRepository artistMusicRepository;

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Long createPlaylist(Long memberId, CreatePlaylistRequest request) {
        List<Music> musics = musicRepository.findAllById(request.getMusics());
        if (musics.size() != request.getMusics().size()) {
            log.error("플레이리스트에 음악 추가 불가: 음악이 존재하지 않습니다.");
            throw new IllegalArgumentException("음악이 존재하지 않습니다.");
        }

        try {
            // 플레이리스트 생성
            Playlist playlist = new Playlist();
            playlist.setName(request.getTitle());
            playlist.setMemberId(memberId);
            playlist.setCreatedAt(LocalDateTime.now());
            playlist.setUpdatedAt(LocalDateTime.now());
            Playlist savedPlaylist = playlistRepository.save(playlist);

            // 플레이리스트 음악 추가
            for (int i = 0; i < musics.size(); i++) {
                PlaylistMusic playlistMusic = new PlaylistMusic();
                playlistMusic.setPlaylistId(savedPlaylist.getId());
                playlistMusic.setMusicId(musics.get(i).getId());
                playlistMusic.setOrder(i);
                playlistMusic.setAddedAt(LocalDateTime.now());
                playlistMusicRepository.save(playlistMusic);
            }

            return savedPlaylist.getId();
        } catch (Exception e) {
            log.error("플레이리스트 생성 중 오류 발생", e);
            throw new RuntimeException("플레이리스트 생성에 실패했습니다.");
        }
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deletePlaylist(Long memberId, Long playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId)
            .orElseThrow(() -> new RuntimeException("플레이리스트를 찾을 수 없습니다."));

        if (!playlist.getMemberId().equals(memberId)) {
            throw new RuntimeException("플레이리스트 삭제 권한이 없습니다.");
        }

        try {
            // 플레이리스트 음악 삭제
            playlistMusicRepository.deleteByPlaylistId(playlistId);
            // 플레이리스트 삭제
            playlistRepository.delete(playlist);
        } catch (Exception e) {
            log.error("플레이리스트 삭제 중 오류 발생", e);
            throw new RuntimeException("플레이리스트 삭제에 실패했습니다.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlaylistMusicResponse> getPlaylistMusics(Long playlistId) {
        try {
            List<PlaylistMusic> playlistMusics = playlistMusicRepository
                .findByPlaylistIdOrderByOrder(playlistId);

            if (playlistMusics.isEmpty()) {
                throw new RuntimeException("플레이리스트를 찾을 수 없습니다.");
            }

            // 필요한 음악 ID 목록 추출
            List<Long> musicIds = new ArrayList<>();
            for (PlaylistMusic playlistMusic : playlistMusics) {
                musicIds.add(playlistMusic.getMusicId());
            }

            // 음악 정보 한 번에 조회
            List<Music> musics = musicRepository.findAllById(musicIds);

            Map<Long, Music> musicMap = new HashMap<>();
            for (Music music : musics) {
                musicMap.put(music.getId(), music);
            }

            List<PlaylistMusicResponse> responses = new ArrayList<>();
            for (PlaylistMusic playlistMusic : playlistMusics) {
                Music music = musicMap.get(playlistMusic.getMusicId());
                Album album = music.getAlbum();

                // 아티스트 목록 생성
                List<ArtistResponse> artistResponses = new ArrayList<>();
                List<Artist> artists = artistMusicRepository.findAllByMusic(music);

                for (Artist artist : artists) {
                    ArtistResponse artistResponse = new ArtistResponse(
                        artist.getId(),
                        artist.getName()
                    );
                    artistResponses.add(artistResponse);
                }

                // presignedUrl 생성
                String presignedUrl = presignedUrlService.getPresignedUrl(
                    album.getImageName()
                );

                PlaylistMusicResponse response = new PlaylistMusicResponse(
                    music.getId(),
                    music.getName(),
                    presignedUrl,
                    formatDuration(music.getDuration()),
                    artistResponses
                );
                responses.add(response);
            }

            return responses;
        } catch (Exception e) {
            log.error("플레이리스트 음악 조회 중 오류 발생", e);
            throw new RuntimeException("플레이리스트 음악 조회에 실패했습니다.");
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<PlaylistResponse> getMyPlaylists(Long memberId) {
        try {
            List<Playlist> playlists = playlistRepository.findByMemberId(memberId);
            List<PlaylistResponse> responses = new ArrayList<>();

            for (Playlist playlist : playlists) {
                List<PlaylistMusic> playlistMusics = playlistMusicRepository.findByPlaylistIdOrderByOrder(
                    playlist.getId());

                // 총 재생 시간과 음악 수 계산
                int totalMusicCount = playlistMusics.size();
                int totalSeconds = 0;

                // 최신 음악의 이미지를 가져오기 위해 가장 높은 trackOrder를 가진 음악 조회
                PlaylistMusic latestMusic = playlistMusicRepository.findTopByPlaylistIdOrderByOrderDesc(
                        playlist.getId())
                    .orElse(null);

                if (latestMusic != null) {
                    Music music = musicRepository.findById(latestMusic.getMusicId())
                        .orElseThrow(() -> new RuntimeException("음악을 찾을 수 없습니다."));

                    // 이미지 URL 생성
                    String imageUrl = presignedUrlService.getPresignedUrl(
                        music.getAlbum().getImageName());

                    // 총 재생 시간 계산
                    List<Long> musicIds = new ArrayList<>();
                    for (PlaylistMusic playlistMusic : playlistMusics) {
                        musicIds.add(playlistMusic.getMusicId());
                    }

                    List<Music> musics = musicRepository.findAllById(musicIds);

                    for (Music m : musics) {
                        totalSeconds += m.getDuration();
                    }

                    PlaylistResponse response = new PlaylistResponse(
                        playlist.getId(),
                        playlist.getName(),
                        imageUrl,
                        formatTotalDuration(totalSeconds),
                        totalMusicCount
                    );
                    responses.add(response);
                }
            }

            return responses;
        } catch (Exception e) {
            log.error("플레이리스트 목록 조회 중 오류 발생", e);
            throw new RuntimeException("플레이리스트 목록 조회에 실패했습니다.");
        }
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public List<PlaylistMusicResponse> updatePlaylist(Long playlistId, String title,
        List<Long> musicIds) {
        try {
            // 플레이리스트 존재 확인
            Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("플레이리스트를 찾을 수 없습니다."));

            // 제목 업데이트
            playlist.setName(title);
            playlist.setUpdatedAt(LocalDateTime.now());
            playlistRepository.save(playlist);

            // 음악 존재 여부 확인
            List<Music> musics = musicRepository.findAllById(musicIds);
            if (musics.size() != musicIds.size()) {
                throw new RuntimeException("존재하지 않는 음악이 포함되어 있습니다.");
            }

            // 기존 플레이리스트 음악 모두 삭제
            playlistMusicRepository.deleteByPlaylistId(playlistId);

            // 새로운 음악 추가
            for (int i = 0; i < musicIds.size(); i++) {
                PlaylistMusic playlistMusic = new PlaylistMusic();
                playlistMusic.setPlaylistId(playlistId);
                playlistMusic.setMusicId(musicIds.get(i));
                playlistMusic.setOrder(i * 1000.0);
                playlistMusic.setAddedAt(LocalDateTime.now());
                playlistMusicRepository.save(playlistMusic);
            }

            // 업데이트된 목록 반환
            return getPlaylistMusics(playlistId);
        } catch (Exception e) {
            log.error("플레이리스트 수정 중 오류 발생", e);
            throw new RuntimeException("플레이리스트 수정에 실패했습니다.");
        }
    }

    private String formatDuration(int seconds) {
        int minutes = seconds / 60;
        int remainingSeconds = seconds % 60;
        return String.format("%d:%02d", minutes, remainingSeconds);
    }

    private String formatTotalDuration(int totalSeconds) {
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;

        if (hours > 0) {
            return String.format("%d시간 %d분", hours, minutes);
        } else {
            return String.format("%d분", minutes);
        }
    }
}
