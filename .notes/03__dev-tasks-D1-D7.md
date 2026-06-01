# 개발 작업 — D+1 ~ D+7 (체크리스트)

**작성**: engineer
**위치**: state/_archive/inside-docs/engineer/03__dev-tasks-D1-D7.md
**상태 표시**: `- [ ]` (대기) / `- [x]` (완료) / `- [-]` (진행 중)

> 각 task 완료 시 체크박스 변경. 진행률 = 체크된 비율.

---

## D+1 — 백엔드 골격 (총 8 tasks)

### 백엔드
- [ ] **DB-01**: Supabase 프로젝트 초기화 (Seoul region, Pro 결제)
- [ ] **DB-02**: 6개 테이블 생성 (profiles, requests, proposals, subscriptions, messages, payments)
- [ ] **DB-03**: RLS 정책 — profiles·requests·proposals 작성
- [ ] **AUTH-01**: Supabase Auth 활성화 — 이메일·휴대폰
- [ ] **AUTH-02**: role 컬럼 트리거 — 가입 시 consumer/agent 분기

### 프론트
- [ ] **NX-01**: Next.js 14 프로젝트 생성 (app router, TypeScript, Tailwind)
- [ ] **NX-02**: Supabase 클라이언트 설정 (lib/supabase/client.ts, server.ts)
- [ ] **NX-03**: 환경변수 셋업 + Vercel env 등록

**완료 조건**: 로컬에서 회원가입 → DB에 profile row 생성됨

---

## D+2 — 핵심 API (총 6 tasks)

- [ ] **API-01**: POST /api/requests (요청서 생성) + Claude Haiku 호출 (요청서 정리)
- [ ] **API-02**: GET /api/requests/me (내 요청서 리스트)
- [ ] **API-03**: GET /api/requests (모든 요청서 — 중개사용, role check)
- [ ] **AI-01**: parseRequestText() 함수 (Claude Haiku, system prompt 적용)
- [ ] **AI-02**: 에러 처리 (parse fail → raw_text만 저장)
- [ ] **TEST-01**: API 스모크 테스트 5개

**완료 조건**: 자유 텍스트 요청서 → AI 정리된 JSON 응답

---

## D+3 — 비즈니스 로직 (총 7 tasks)

- [ ] **API-04**: POST /api/proposals (매물 제안 생성, 구독 검증 미들웨어)
- [ ] **API-05**: GET /api/proposals?request_id= (요청서별 받은 제안)
- [ ] **API-06**: 구독 검증 — 미구독 동에 제안 시 403
- [ ] **API-07**: POST /api/subscriptions (동 구독)
- [ ] **API-08**: 프로모션 로직 — 3개 결제 시 자동 bonus 3개 생성
- [ ] **API-09**: GET /api/subscriptions/me
- [ ] **TEST-02**: 프로모션 시나리오 E2E 테스트

**완료 조건**: 중개사가 구독 동에만 제안 가능, 3 결제 → 6 동 자동 적용

---

## D+4 — UI 연결 (총 5 tasks)

- [ ] **UI-01**: 프로토타입 minified HTML → 컴포넌트로 분해
- [ ] **UI-02**: 요청서 작성 페이지 (mock → API 연결)
- [ ] **UI-03**: 받은 매물 제안 리스트
- [ ] **UI-04**: 중개사 대시보드 4탭 (요청서 리스트·매물 제안·구독·통계)
- [ ] **UI-05**: 매물 제안 작성 폼

**완료 조건**: 프로토타입 UI 그대로 작동, 데이터는 실 DB

---

## D+5 — 사진 업로드 + 약관 (총 5 tasks)

- [ ] **STG-01**: Supabase Storage — proposal-photos·verification-docs 버킷
- [ ] **STG-02**: 사진 업로드 컴포넌트 (최대 5장, 5MB 제한)
- [ ] **STG-03**: 이미지 압축·리사이즈 (next/image)
- [ ] **DOC-01**: 약관 4종 페이지 임베드 (/terms-consumer, /terms-agent, /privacy, /refund)
- [ ] **DOC-02**: Footer 4개 링크 + 회원가입 동의 체크박스

**완료 조건**: 중개사가 매물 사진 업로드 + 모든 법적 페이지 게시

---

## D+6 — 결제 + 본인인증 (총 6 tasks)

- [ ] **PAY-01**: Toss Payments SDK 통합 + 빌링키 발급
- [ ] **PAY-02**: 정기 구독 결제 흐름 (매월 자동)
- [ ] **PAY-03**: 결제 webhook (성공·실패 처리)
- [ ] **PAY-04**: 결제 내역·영수증 페이지
- [ ] **AUTH-03**: Toss 본인인증 통합 (소비자)
- [ ] **AUTH-04**: 중개사 사업자등록증·면허번호 업로드 + 관리자 수동 승인 큐

**완료 조건**: 첫 결제 ₩5,000 성공, 본인인증 통과

---

## D+7 — 배포 + E2E (총 5 tasks)

- [ ] **DEP-01**: Vercel production 배포
- [ ] **DEP-02**: 도메인 연결 (inside.crypee.io 또는 별도)
- [ ] **DEP-03**: 환경변수 production 설정
- [ ] **TEST-03**: E2E 시나리오 5개 (가입·요청서·제안·결제·해지)
- [ ] **MON-01**: Sentry·PostHog 통합 (에러·이벤트 추적)

**완료 조건**: production 도메인에서 전체 흐름 작동

---

## 진행률 추적

```
D+1: 0/8 (0%)
D+2: 0/6 (0%)
D+3: 0/7 (0%)
D+4: 0/5 (0%)
D+5: 0/5 (0%)
D+6: 0/6 (0%)
D+7: 0/5 (0%)
─────────────────
전체: 0/42 (0%)
```

태스크 완료 시 체크박스 변경 → 자동 진행률 갱신 (수동).

---

## 차단 요소 (사전 해결 필요)

1. **D+0 사용자 셋업** (Toss·Vercel·Supabase·GitHub) 완료되어야 D+1 시작 가능
2. **Toss Payments 심사** 3~5일 — D+6에 완료 안 되면 결제 모듈 D+8로 연기 (런칭 영향 X, 후일 추가)
3. **카카오 알림톡** 2~4주 리드타임 — 1주 안 안 됨. Phase 2 (D+14 이후)

---

**담당**: engineer (Claude Code)
**병행**: legal·compliance·marketer 별도 트랙
