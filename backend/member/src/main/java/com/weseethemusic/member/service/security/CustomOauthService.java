package com.weseethemusic.member.service.security;

import com.weseethemusic.member.common.entity.Member;
import com.weseethemusic.member.common.entity.Member.Role;
import com.weseethemusic.member.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomOauthService extends DefaultOAuth2UserService {

  private final MemberRepository memberRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    Map<String, Object> attributes = oAuth2User.getAttributes();

    // 사용자 정보 추출
    String email = (String) attributes.get("email");
    String nickname = (String) attributes.get("display_name");
    String profileImage = null;

    // 프로필 이미지가 있는 경우 가져오기
    if (attributes.containsKey("images") && !((List<?>) attributes.get("images")).isEmpty()) {
      profileImage = (String) ((Map<String, Object>) ((List<?>) attributes.get("images")).get(0)).get("url");
    }

    // 기존 사용자 여부 확인 및 저장 또는 업데이트
    Member member = memberRepository.findByEmail(email).orElse(null);
    if (member == null) {
      // 신규 사용자 생성
      member = new Member();
      member.setEmail(email);
      member.setNickname(nickname);
      member.setProfileImage(profileImage);
      member.setProvider("spotify");
      member.setCreatedAt(new Date());
      member.setRole(Role.USER); // 기본 역할 설정
      memberRepository.save(member);
    } else {
      // 기존 사용자 로그인 시간과 프로필 이미지 업데이트
      member.setLastLoginAt(new Date());
      member.setProfileImage(profileImage);
      memberRepository.save(member);
    }

    // 사용자 속성 맵 생성 (OAuth2User 반환용), null 검사 포함
    Map<String, Object> userAttributes = new HashMap<>();
    userAttributes.put("id", member.getId());
    userAttributes.put("nickname", member.getNickname() != null ? member.getNickname() : "Anonymous");
    userAttributes.put("email", member.getEmail() != null ? member.getEmail() : "No email");
    userAttributes.put("profileImage", member.getProfileImage() != null ? member.getProfileImage() : "No image");

    return new DefaultOAuth2User(
        Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
        userAttributes,
        "email"
    );
  }
}
