# Travel Booking Starter

HTML, CSS, Vanilla JavaScript + Firebase로 만드는 여행지/숙소 예약 사이트 스타터 프로젝트입니다.

## 1. 시작 전 준비
1. Firebase Console에서 프로젝트 생성
2. Authentication > Sign-in method에서 Email/Password 활성화
3. Realtime Database 생성
4. Firebase 웹 앱 등록
5. 발급받은 설정값을 `js/firebase-config.js`에 입력

## 2. 로컬 실행
VS Code Live Server를 사용하거나 프로젝트 루트에서 다음 명령을 실행합니다.

```bash
python -m http.server 5500
```

브라우저:
`http://localhost:5500`

## 3. Firebase 설정
`js/firebase-config.js`의 YOUR_... 값을 실제 값으로 교체하세요.

## 4. GitHub 업로드
```bash
git init
git add .
git commit -m "Initial travel booking project"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## 5. Vercel 배포
1. Vercel 로그인
2. Add New Project
3. GitHub 저장소 선택
4. Framework Preset: Other
5. Deploy

## 6. 권장 개발 순서
1. 메인/여행지/숙소 화면
2. 회원가입/로그인
3. 예약
4. 관리자
5. Firebase CRUD
6. Security Rules
7. 반응형
8. GitHub
9. Vercel
