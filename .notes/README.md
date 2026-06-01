# inside/.notes/ — 참고 자료 인덱스

ai-company 회사 운영 시스템에서 복사한 인사이드 프로젝트 핵심 참고 문서.
**읽기 전용**으로 다룬다. 원본은 `../../state/_archive/inside-docs/` 에 있다.

## 파일

- **`master-1week-plan.md`** — D+0~D+7 1주 압축 일정 (병렬 트랙: 엔지니어·법무·마케팅·사용자)
- **`01__db-schema.md`** — Supabase Postgres 스키마 + RLS 정책 (D+1 구현)
- **`02__ai-prompts.md`** — 요청서 자동 정리 Claude Haiku 프롬프트
- **`03__dev-tasks-D1-D7.md`** — 42개 개발 태스크 체크리스트 (매일 진행 확인)
- **`brokerage-law-analysis.md`** — 공인중개사법 적용 분석 (P0 컴플라이언스)
- **`business-proposal.md`** — 사업 제안서 (외부 공유용 — 투자·파트너·중개사 모집)

## 사용 방법

Claude Code 세션 시작 시:

> `.notes/03__dev-tasks-D1-D7.md` 의 오늘 D+N 작업 확인하고 시작하자

DB 작업 시:

> `.notes/01__db-schema.md` 의 스키마 그대로 Supabase 마이그레이션 작성해줘

AI 호출 시:

> `.notes/02__ai-prompts.md` 의 프롬프트로 요청서 정리 API 구현

## 갱신

`.notes/` 파일이 outdated 되면:
1. 원본(`../../state/_archive/inside-docs/`) 에서 다시 복사
2. 또는 회사 운영 시스템 대시보드에서 해당 문서에 코멘트 → 에이전트가 개정 → 다시 복사
