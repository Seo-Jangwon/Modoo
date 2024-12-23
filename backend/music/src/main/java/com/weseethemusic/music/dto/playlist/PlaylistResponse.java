package com.weseethemusic.music.dto.playlist;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistResponse {

    private Long id;
    private String name;
    private String image;
    private String totalDuration;
    private int totalMusicCount;
    private List<PlaylistMusicResponse> playlistMusics;
    private Boolean isLike;

}
