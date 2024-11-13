package com.weseethemusic.music.controller;

import com.weseethemusic.music.common.exception.CustomException;
import com.weseethemusic.music.common.exception.ErrorCode;
import com.weseethemusic.music.dto.ResponseDto;
import com.weseethemusic.music.service.MusicLikeServiceImpl;
import java.util.Map;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/musics")
@RequiredArgsConstructor
public class MusicLikeController {

    private final MusicLikeServiceImpl musicLikeService;

    // 음악 좋아요 설정
    @PostMapping("/music/like")
    public ResponseDto<Void> likeMusic(@RequestHeader("X-Member-Id") Long memberId,
        @RequestBody Map<String, Long> map) {
        try {
            musicLikeService.likeMusic(memberId, map.get("id"));
        } catch (NoSuchElementException e) {
            throw new CustomException(ErrorCode.NOT_FOUND, "음악이 존재하지 않습니다.");
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "내부 서버 오류");
        }

        return ResponseDto.res(200);
    }

}
