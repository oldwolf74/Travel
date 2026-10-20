# PRD.md

# 여행지 소개 및 주변 숙소 예약 사이트

## 핵심 기능
- 여행지 목록/상세
- 여행지 주변 숙소 목록
- 숙소 상세
- 회원가입/로그인
- 로그인 회원 예약
- 마이페이지 예약조회
- 관리자 대시보드
- 여행지/숙소 CRUD
- 회원 조회
- 예약 조회 및 상태 변경

## 데이터 구조

### destinations
- id
- name
- region
- address
- summary
- description
- imageUrl
- createdAt
- updatedAt

### stays
- id
- destinationId
- name
- address
- description
- imageUrl
- pricePerNight
- maxGuests
- contact
- createdAt
- updatedAt

### members
- uid
- email
- name
- phone
- role
- createdAt
- updatedAt

### reservations
- id
- memberId
- stayId
- destinationId
- checkIn
- checkOut
- guests
- rooms
- guestName
- guestPhone
- totalPrice
- status
- createdAt
- updatedAt

## 일반 메뉴
- 홈
- 여행지
- 숙소
- 예약
- 마이페이지
- 로그인/로그아웃

## 관리자 메뉴
- 대시보드
- 여행지 관리
- 숙소 관리
- 회원 관리
- 예약 관리
- 사이트 보기
- 로그아웃

## 관리자 대시보드
- 전체 회원 수
- 전체 여행지 수
- 전체 숙소 수
- 전체 예약 수
- 예약 대기 수
- 예약 확정 수
- 최근 예약
- 최근 가입 회원

## 예약 흐름
숙소 상세 → 로그인 확인 → 체크인/체크아웃/인원/객실 입력 → 총금액 계산 → 예약 저장 → 예약 완료 → 마이페이지 확인

## 1차 버전 제외
- 실제 결제
- 리뷰
- 찜하기
- 쿠폰
- 포인트
- 지도 API
- 소셜 로그인
- 복잡한 객실 재고관리
