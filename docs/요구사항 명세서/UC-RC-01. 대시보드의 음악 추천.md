# UC-RC-01

제목: 대시보드의 음악 추천
범위: 추천 시스템
액터: 사용자
목표: 사용자는 음악을 추천 받을 수 있다.
버전: v1
우선순위: 1
BE 개발 일정: 2024년 11월 1일
FE 개발 일정: 2024년 10월 30일
진행도: 시작 전

# 요약 설명

- 사용자는 좋아요 한 아티스트의 음악을 메인 화면의 개인화된 대시보드에서 추천 받을 수 있다.

---

# 성공 시나리오

### 사전 조건

- 사용자가 로그인 상태.
- 추천을 위해 일부 **청취 이력**이 시스템에 저장되어 있음.

 

1. 사용자가 노래, 앨범, 아티스트 또는 다른 사람의 플레이리스트에서 **좋아요** 버튼을 누름.
2. 시스템은 사용자가 좋아요 한 **항목의 메타데이터**(장르, BPM, 아티 스트 등)를 분석.
3. **AI 추천 엔진**이 해당 데이터와 기존 청취 이력, 비슷한 사용자들의 취향을 비교.
4. 추천된 음악은 **개인화된 피드**(예: “이 곡을 좋아한다면 이런 음악도 좋아할 거예요”)에 표시됨.
5. 추천 곡을 저장하거나 플레이리스트에 추가할 수 있음.
6. 사용자가 추천 음악에 반응할수록(좋아요/저장), 시스템의 추천 정확도가 개선됨.

### 사후 조건

- 좋아요 데이터가 저장되고 추천 시스템에 반영됨.
- 사용자 피드가 최신 추천 곡들로 업데이트됨.

- FE
    - 사용자 추천 목록 조회 API를 호출한다.
- BE
    - **MongoDB**에 저장된 사용자의 검색 기록을 조회한다.
    - **MongoDB**에 저장된 사용자의 재생 기록을 조회한다.
    - 기록과 유사한 음악을 Python으로 구현한 알고리즘을 통해 선별한다.
    - 위 결과물과 함께 API 호출 결과를 반환한다.

---

# 확장

---