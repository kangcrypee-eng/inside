# 인사이드 (Inside)

역방향 부동산 매칭 플랫폼. 소비자 요청서 → 공인중개사가 직접 매물 제안.

## 빠른 시작 (사용자용)

```bash
cd /Users/kang/Downloads/ai-company/inside
claude                    # Claude Code 시작 — CLAUDE.md 자동 로드
```

Claude Code가 켜진 뒤 첫 한 마디 예시:

> 오늘 D+1 시작. `.notes/03__dev-tasks-D1-D7.md` 의 D+1 작업부터 진행해줘. 모르는 부분은 멈추고 나에게 물어봐.

## 일정 한눈에

```
D+0 (오늘)  사용자: GitHub repo + Vercel·Supabase 계정 + 사업자등록증
            에이전트: 약관·기획·1주 일정 (완료)

D+1         Supabase 스키마 + Auth + RLS
D+2         요청서 CRUD + AI 요청서 정리
D+3         매물 제안 API + 구독 검증 + 프로모션
D+4         프로토타입 → Next.js 페이지 연결
D+5         Supabase Storage + 사진 업로드
D+6         최종 법무 검토 + 본인인증
D+7         E2E 테스트 + Vercel production 배포 + 베타 오픈 (무료 2주)

D+7~D+14    Toss Payments 사업자 심사 진행 (사이트 URL 제출)
D+15        결제 활성화 → ₩5,000/동/월 정상 운영
```

상세: `.notes/master-1week-plan.md`

## 디렉토리

- `src/` — Next.js 소스
- `supabase/` — DB 마이그레이션 + RLS
- `.notes/` — 기획·DB 스키마·AI 프롬프트·법무 분석 참고 자료
- `docs/` — 개발 진행 로그

## 회사 운영 시스템 (ai-company) 연결

이 폴더(inside)는 **제품 코드**. 운영(영업·법무·마케팅·결제 승인)은 상위 폴더 ai-company의 대시보드에서 처리합니다.

- 코드 작업 → 이 폴더에서 `claude` 켜고 진행
- 운영 작업 → 별도 터미널에서 `cd ../ && python3 dashboard.py` 후 브라우저로 접속

## 환경변수 (D+1 셋업)

```bash
# .env.local (git에 안 들어감)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         # 서버 전용
ANTHROPIC_API_KEY=                  # Claude Haiku — 요청서 정리
TOSS_CLIENT_KEY=                    # D+15 활성화
TOSS_SECRET_KEY=                    # D+15 활성화 (서버 전용)
```

## 라이선스

비공개 (회사 내부). 외부 공유는 사업 제안서(`.notes/business-proposal.html`) 로만.
