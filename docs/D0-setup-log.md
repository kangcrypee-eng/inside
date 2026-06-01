# D+0 셋업 로그 — 프로젝트 초기 스캐폴딩

**작성자**: engineer (Claude Code)
**작성일**: 2026-06-01
**프로젝트**: 인사이드 (Inside)
**상태**: ✅ 코드 측 D+0 완료

## 요약 (TL;DR)
Next.js 14 + TypeScript(strict) + Tailwind 수동 스캐폴딩 완료. `npm install`·`npm run dev` 정상(HTTP 200), 임시 랜딩 렌더링 확인, 첫 커밋(`bc00221`) 생성. git remote·외부 계정은 사용자 작업으로 남음.

## 완료 항목

- [x] **git 초기화 + 원격 push** — `git init` + branch `main`, remote `git@github.com:kangcrypee-eng/inside.git` (SSH), `git push -u origin main` 완료
- [x] **Supabase 연결** — `.env.local` 에 프로젝트 `dscsafqxzqqsnvuurnhq` URL·anon·service_role 키 설정 (anon 키 유효성 검증 완료, gitignore로 커밋 제외)
- [x] **package.json** — next@^14.2.15, react@^18.3.1, @supabase/supabase-js, @anthropic-ai/sdk, zod, tailwindcss/postcss/autoprefixer, typescript + @types
- [x] **tsconfig.json** — strict mode, `noUncheckedIndexedAccess`, paths alias `@/*` → `./src/*`
- [x] **next.config.js** — App Router(기본), reactStrictMode
- [x] **tailwind.config.ts** + **postcss.config.js** — Pretendard sans 폰트
- [x] **src/app/layout.tsx** — `lang="ko"`, 한국어 metadata, globals.css import
- [x] **src/app/page.tsx** — "인사이드 — 곧 출시" 임시 랜딩
- [x] **src/app/globals.css** — Tailwind base + Pretendard CDN + `word-break: keep-all`
- [x] **src/lib/supabase.ts** — anon 키 전용 stub (service_role은 D+1 server 분리)
- [x] **src/types/index.ts** — 빈 파일 (D+1 스키마 타입 채움)
- [x] **.env.local.example** — Supabase·Anthropic·Toss 환경변수 목록
- [x] **npm install** — 149 패키지 설치 성공
- [x] **npm run dev** — http://localhost:3000 HTTP 200, 랜딩 텍스트("인사이드"/"곧 출시") 확인
- [x] **tsc --noEmit** — strict 컴파일 통과
- [x] **첫 커밋** — `bc00221 chore(d0): initial Next.js 14 + TypeScript + Tailwind scaffolding` (22 파일, node_modules·.env.local 제외 확인)

## 알려진 한계 / 막힌 점

- **npm 취약점 2건** (moderate 1, high 1) — `audit fix --force`는 호환성 위험으로 미실행. D+1에 `npm audit` 상세 확인 후 개별 대응 권장. (환경 문제 아님, 임의 수정 안 함)
- **node v26.0.0** 사용 중 — Next.js 14 정상 동작 확인했으나 공식 권장(LTS 18/20) 밖. 빌드 이슈 발생 시 참고.
- supabase 클라이언트는 단일 stub. D+1 NX-02에서 `lib/supabase/{client,server}.ts` 분리 예정.

## 사용자(Principal) 잔여 D+0 작업
ai-company 대시보드 노란색 패널 기준:
1. ~~GitHub repo 생성·연결~~ ✅ 완료 (kangcrypee-eng/inside, SSH push)
2. ~~Vercel·Supabase 계정~~ ✅ 완료 (Vercel CLI v54.6.1 설치, Supabase 키 연결)
3. ❸ 사업자등록증 PDF·면허번호 준비 (+ Toss Payments 사업자 신청 — 리드타임 최대, 오늘 시작 권장) ← **남음**

## 다음 단계 — D+1 첫 태스크
`.notes/03__dev-tasks-D1-D7.md` D+1 (백엔드 골격, 8 tasks):
- [ ] **DB-01**: Supabase 프로젝트 초기화 (Seoul region) ← **시작점**
- [ ] **DB-02**: 6개 테이블 생성 (`.notes/01__db-schema.md` 마이그레이션)
- [ ] **DB-03**: RLS 정책 (profiles·requests·proposals)
- [ ] **AUTH-01/02**: Supabase Auth + role 트리거
- [ ] **NX-02/03**: supabase client/server 분리 + 환경변수

> ⚠️ DB-01은 외부 비용(Supabase Pro) 발생 가능 — G2 승인 게이트. D+1 시작 시 사용자 확인 필요.
