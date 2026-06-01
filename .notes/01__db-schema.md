# 인사이드 — Supabase Postgres 스키마

**작성**: engineer, 2026-06-01
**대상**: D+1 마이그레이션
**플랫폼 임베드**: backend 핵심

## Tables

```sql
-- 1. users (Supabase Auth 확장)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  phone text,
  role text not null check (role in ('consumer', 'agent')),
  -- consumer fields
  ci text,  -- 본인인증 CI
  -- agent fields
  business_no text,
  license_no text,
  business_cert_url text,  -- 사업자등록증 사진
  license_cert_url text,
  verified_at timestamptz,
  verified_by uuid references public.profiles(id),
  rejected_reason text,
  created_at timestamptz default now()
);

-- 2. requests (소비자 요청서)
create table public.requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  raw_text text not null,  -- 사용자 자유 입력
  parsed_json jsonb,  -- AI 정리 결과
  region text not null,  -- 동 이름
  house_types text[] not null,  -- apt/villa/officetel/house/commercial
  deal_type text not null check (deal_type in ('매매', '전세', '월세')),
  price_min int,
  price_max int,
  monthly_min int,  -- 월세인 경우
  monthly_max int,
  area_min int,
  area_max int,
  rooms int,
  baths int,
  tags text[],  -- 라이프스타일 태그
  checks text[],  -- 시설 체크
  status text default 'open' check (status in ('open', 'closed', 'expired')),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);

-- 3. proposals (중개사 매물 제안)
create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  agent_id uuid not null references public.profiles(id) on delete cascade,
  photos text[] not null,  -- Supabase Storage URLs
  description text not null,
  price int,
  monthly int,
  address text not null,
  area int,
  floor text,
  rooms int,
  baths int,
  movein_date date,
  contact text not null,
  status text default 'sent' check (status in ('sent', 'viewed', 'replied', 'closed')),
  created_at timestamptz default now()
);

-- 4. subscriptions (중개사 동 구독)
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.profiles(id) on delete cascade,
  region text not null,
  start_date timestamptz default now(),
  end_date timestamptz not null,
  plan text not null check (plan in ('paid', 'bonus')),  -- 결제 동 / 프로모션 무료 동
  parent_id uuid references public.subscriptions(id),  -- bonus의 경우 parent paid 참조
  monthly_fee int default 5000,
  status text default 'active' check (status in ('active', 'cancelled', 'expired')),
  toss_billing_key text,
  created_at timestamptz default now()
);

create index idx_subscriptions_agent_region on subscriptions(agent_id, region, status);

-- 5. messages (인앱 채팅 v0)
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- 6. payments (결제 이력)
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.profiles(id),
  amount int not null,
  status text not null check (status in ('paid', 'failed', 'refunded')),
  toss_payment_key text,
  toss_order_id text,
  paid_at timestamptz default now(),
  refunded_at timestamptz,
  refunded_amount int
);
```

## RLS (Row Level Security) 정책

```sql
-- profiles: 본인 정보만 수정, 모두 읽기
alter table profiles enable row level security;
create policy "own profile read/write" on profiles
  for all using (auth.uid() = id);
create policy "verified profiles read" on profiles
  for select using (verified_at is not null);

-- requests: 본인 작성 R/W, 모든 인증된 user 읽기
alter table requests enable row level security;
create policy "own requests" on requests
  for all using (auth.uid() = user_id);
create policy "all agents read" on requests
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'agent' and verified_at is not null)
  );

-- proposals: 본인이 제안한 것만 작성, 요청서 작성자·중개사 본인 읽기
alter table proposals enable row level security;
create policy "agent insert (subscribed region only)" on proposals
  for insert with check (
    auth.uid() = agent_id and
    exists (
      select 1 from subscriptions s
      join requests r on r.id = proposals.request_id
      where s.agent_id = auth.uid()
        and s.region = r.region
        and s.status = 'active'
        and s.end_date > now()
    )
  );
create policy "proposal read by parties" on proposals
  for select using (
    auth.uid() = agent_id or
    exists (select 1 from requests where id = proposals.request_id and user_id = auth.uid())
  );
```

## 인덱스·뷰

```sql
-- 동별 새 요청서 조회 인덱스
create index idx_requests_region_status on requests(region, status, created_at desc);

-- 중개사 대시보드 — 구독 동 새 요청서 뷰
create view agent_dashboard as
  select r.*, p.full_name as user_name
  from requests r
  join profiles p on p.id = r.user_id
  where r.status = 'open'
  order by r.created_at desc;
```

## Storage

- `request-attachments/` (소비자 첨부, 선택)
- `proposal-photos/` (중개사 매물 사진)
- `verification-docs/` (사업자등록증·면허증, 회사만 접근)

## 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ANTHROPIC_API_KEY=...  # 요청서 AI 정리
TOSS_SECRET_KEY=...
TOSS_CLIENT_KEY=...
```
