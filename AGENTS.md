# AGENTS.md

## 프로젝트 목적
여행지 소개와 주변 숙소 예약 기능을 제공하는 반응형 웹사이트를 만든다.

## 기술 스택
- HTML5
- CSS3
- 순수 JavaScript(Vanilla JavaScript)
- Firebase Authentication
- Firebase Realtime Database
- GitHub
- Vercel

React, Vue, Angular, TypeScript, Tailwind CSS는 사용하지 않는다.

## 서버 실행
- 로컬 개발 서버는 Python을 사용한다.
- 프로젝트 루트에서 `python -m http.server 8000` 명령으로 실행한다.
- 브라우저에서는 `http://localhost:8000`으로 접속한다.
- 별도의 Node.js 서버나 프레임워크 기반 개발 서버는 사용하지 않는다.

## 폴더 규칙
- 루트: index.html, AGENTS.md, PRD.md, README.md, .gitignore, vercel.json
- 기타 HTML: html/
- CSS: css/
- JavaScript: js/
- 이미지: assets/images/
- 아이콘: assets/icons/

## 데이터 노드
Firebase Realtime Database 최상위 노드는 다음 4개만 기본 사용한다.
- destinations
- stays
- members
- reservations

## 인증
- 회원가입/로그인은 Firebase Authentication 사용
- 비밀번호는 Realtime Database에 저장하지 않는다.
- members에는 uid, email, name, phone, role, createdAt, updatedAt만 저장한다.

## 예약 상태
- pending
- confirmed
- cancelled
- completed

## 관계
- destinations 1:N stays
- members 1:N reservations
- stays 1:N reservations

## 개발 순서
1. 화면 골격
2. 공통 CSS
3. 여행지/숙소 화면
4. 회원가입/로그인
5. 예약
6. 관리자
7. Firebase 연결
8. Security Rules
9. 반응형 점검
10. GitHub
11. Vercel
