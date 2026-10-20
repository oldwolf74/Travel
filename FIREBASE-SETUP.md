# Firebase 설정 순서

1. Firebase Console에서 프로젝트 생성
2. 프로젝트에 Web App 추가
3. Authentication > Sign-in method > Email/Password 활성화
4. Realtime Database 생성
5. `js/firebase-config.js`의 설정값 교체
6. `firebase-rules.json` 내용을 Realtime Database > Rules에 붙여넣기
7. 일반 회원 1명을 가입시킨 뒤 Firebase Console에서 해당 members/{uid}/role을 `admin`으로 변경하면 관리자 테스트 가능

## 주의
`firebase-rules.json`은 학습용 기본 규칙입니다. 실제 서비스에서는 검증 규칙을 더 강화해야 합니다.
