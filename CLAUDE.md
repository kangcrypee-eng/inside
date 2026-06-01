# 인사이드 (Inside) — 프로젝트 헌법

> Claude Code가 이 폴더에서 작업할 때 항상 먼저 읽는 문서.
> 이 파일은 인사이드 **제품 개발 코드**에만 해당된다. 회사 전체 운영 헌법은 `../CLAUDE.md` (ai-company/CLAUDE.md) 참조.

---

## 1. 정체성

- **프로젝트명**: 인사이드 (Inside)
- **한 줄 설명**: 역방향 부동산 매칭 — 소비자가 원하는 매물을 요청하면 공인중개사가 직접 매물을 가져다 제안하는 양면 마켓플레이스
- **수익 모델**: 공인중개사가 ₩5,000/동/월 구독 결제 (3 결제 → 6 사용 프로모션, 첫 3개월)
- **AI 역할**: 최소 — 소비자 요청서 텍스트만 Claude Haiku로 자동 정리. 매칭·추천 알고리즘 없음.
- **출시 목표**: D+7 베타 (무료) → D+15 결제 활성화 (Toss Payments 심사 통과 후)

## 2. 기술 스택 (고정 — 변경 시 사용자 승인 필수)

| 영역 | 선택 | 사유 |
|---|---|---|
| 프레임워크 | Next.js 14 (App Router) + TypeScript | 베르셀 배포 1주 가능, RSC로 SEO 확보 |
| 데이터베이스 | Supabase Postgres + Auth + Storage | 1주 안에 RLS·인증·파일까지 한 번에 |
| 배포 | Vercel | git push → 자동 배포, 무료 티어 충분 |
| 결제 | Toss Payments (빌링키 + 본인인증) | 한국 SaaS 표준, D+7 이후 신청 |
| 인증 | Supabase Auth (이메일·비밀번호 + 카카오 OAuth) | 별도 인증 서버 불필요 |
| 알림 | (Phase 2) 카카오 알림톡 — D+7 이후 발신등록 신청 |
| AI | Anthropic Claude Haiku — 요청서 텍스트 정리 1건당 1회 호출 |
| 스타일 | Tailwind CSS | 빠른 프로토타이핑 |

**금지 사항**:
- 새로운 인프라 추가 금지 (Redis·Kafka·Elasticsearch 등) — 단순함 유지
- 매칭 알고리즘·ML 모델 구축 금지 (사람이 직접 매물 제안)
- 실시간 채팅 풀 구현 금지 (Phase 2)

## 3. 폴더 구조

```
inside/
├── CLAUDE.md          ← 이 파일
├── README.md          ← 빠른 시작
├── .gitignore
├── .notes/            ← ai-company/state/_archive/inside-docs/ 의 핵심 참고 복사
│   ├── 01__db-schema.md
│   ├── 02__ai-prompts.md
│   ├── 03__dev-tasks-D1-D7.md
│   ├── master-1week-plan.md
│   └── brokerage-law-analysis.md
├── src/               ← Next.js 소스 (D+1부터 채워짐)
│   ├── app/           ← App Router 페이지
│   ├── components/    ← 재사용 UI
│   ├── lib/           ← Supabase 클라이언트, 유틸
│   └── types/         ← TypeScript 타입
├── supabase/          ← 마이그레이션 + RLS 정책
│   ├── migrations/
│   └── seed.sql
└── docs/              ← 개발 진행 로그 (선택)
```

## 4. 개발 흐름 (D+0 → D+7)

`.notes/03__dev-tasks-D1-D7.md` 가 42개 태스크 체크리스트의 단일 진리 원천.

매일 시작 시:
1. `.notes/03__dev-tasks-D1-D7.md` 의 오늘 날짜 섹션 확인
2. 우선순위 P0 부터 처리
3. 완료 시 체크박스 표시 (`[x]`)
4. 일별 산출물 1건 — 진행 보고서를 `../state/drafts/engineer/` 에 작성 → 대시보드에서 검증

## 5. 회사 운영 시스템(ai-company)과의 연결

inside/ 는 **제품 코드**, ai-company/ 는 **회사 운영 시스템**. 다음 흐름으로 동기화:

| 산출물 종류 | 저장 위치 | 사유 |
|---|---|---|
| 실제 코드 (.ts, .tsx, .sql, .css) | `inside/src/`, `inside/supabase/` | git push 대상 |
| 개발 진행 보고서 (.md) | `../state/drafts/engineer/` | 대시보드 패널 표시 + Verifier 검증 |
| 기획·법무·마케팅 문서 (.md) | `../state/_archive/inside-docs/` (참조만) | inside/.notes/ 에 복사본 보유 |
| 결제 검증·G2 승인 요청 | `../state/pending-approval/` | CFO 자동 G2 처리 |

핵심: **코드는 inside/ 안에서만 작업. 상위(ai-company) 파일은 읽기 전용으로만 참조.**

## 6. 코드 컨벤션

- **언어**: TypeScript 엄격 모드, any 금지
- **이름**: kebab-case 파일, PascalCase 컴포넌트, camelCase 함수
- **state**: Zustand 또는 useState — Redux 금지
- **에러 처리**: try-catch 후 toast.error() — silent failure 금지
- **로그**: console.log 금지 (개발 중만). production은 `lib/logger.ts` 사용
- **DB 쿼리**: Supabase 클라이언트 직접 사용. ORM 도입 금지 (1주 안 필요 없음)
- **RLS**: 모든 테이블에 RLS 활성화 + 정책 명시. `.notes/01__db-schema.md` 참조.

## 7. 보안 P0 (이미 적용 가능)

- Supabase service_role 키는 서버 환경변수에만 (`process.env.SUPABASE_SERVICE_ROLE_KEY`)
- 브라우저는 anon 키만 사용
- Toss 시크릿 키는 서버 API route(`app/api/payments/`)에서만
- 사용자 입력은 모두 zod 스키마 검증
- SQL 인젝션 회피: Supabase 쿼리 빌더만 사용 (raw SQL 금지)

## 8. 사용자 (Principal) 승인 게이트

다음 행동은 사용자 직접 승인 후 실행:
- (G2) 외부 비용 발생 — Vercel Pro·Supabase Pro 업그레이드, AI API 키 등록 등
- (P7) 비가역 — DB 마이그레이션 production 적용, public deploy, 도메인 변경
- (G3) 마케팅 — 메타·네이버 광고 ON (D+7 이후)

승인 요청은 `../state/pending-approval/<topic>.md` 작성. 대시보드가 자동 노출.

## 9. 비상

- 사용자가 "STOP" / "중지" → 즉시 작업 중단 + 현재 상태를 `docs/emergency-snapshot.md` 에 저장
- 빌드·테스트 실패 시 → 절대 강제 push 금지. 사용자에게 보고.

## 10. 이 문서의 수정

사용자만 수정 가능. Claude는 `docs/proposals/` 에 제안서로만 작성.
