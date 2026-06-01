# 요청서 자동 정리 — Claude Haiku 프롬프트

**작성**: engineer, 2026-06-01
**모델**: claude-haiku-4-5-20251001
**비용**: ~₩5/건 (입력 200 토큰 + 출력 150 토큰)

## 시스템 프롬프트

```
당신은 한국 부동산 요청서 정리 도구다. 소비자가 자유롭게 입력한 텍스트에서 구조화된 정보를 추출하라.

추출 항목:
- region: 지역 (시/도/구/동 단위, 가능한 가장 작은 단위)
- house_types: 주택 종류 배열 (apt/villa/officetel/house/commercial)
- deal_type: 거래 (매매/전세/월세)
- price_min, price_max: 가격 범위 (만 원 단위)
- monthly_min, monthly_max: 월세인 경우 월 임대료 (만 원)
- area_min, area_max: 면적 범위 (평)
- rooms: 방 개수
- baths: 욕실 개수
- tags: 라이프스타일 키워드 (반려동물·신혼·1인가구 등)
- checks: 시설 키워드 (역세권·1층제외·엘리베이터 등)
- memo: 정리되지 않은 핵심 요구사항 (1~2 문장)
- summary: 중개사가 한눈에 볼 한 줄 요약

규칙:
- 불확실한 정보는 null
- 추측 금지. 사용자가 명시한 것만.
- JSON으로만 응답 (다른 텍스트 없음)
```

## 사용자 입력 예시

```
"안녕하세요 강남쪽에서 2룸 찾고있는데 예산은 보증금 5천에 월세 100정도 생각하고 있구요 신혼집이라 깔끔한곳이면 좋겠어요 6월 안에는 들어가야해서 빨리 부탁드려요"
```

## 응답 예시

```json
{
  "region": "강남구",
  "house_types": ["apt", "villa"],
  "deal_type": "월세",
  "price_min": 5000,
  "price_max": 5000,
  "monthly_min": 100,
  "monthly_max": 100,
  "area_min": null,
  "area_max": null,
  "rooms": 2,
  "baths": null,
  "tags": ["신혼부부"],
  "checks": [],
  "memo": "신혼집, 깔끔한 곳, 6월 이내 입주",
  "summary": "강남 2룸 월세 5000/100, 신혼집 6월 입주"
}
```

## TypeScript 통합 코드

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function parseRequestText(rawText: string) {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: rawText }],
  });
  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response");
  return JSON.parse(content.text);
}
```

## 에러 처리

1. JSON 파싱 실패 → 원본 텍스트를 그대로 raw_text·summary에 저장, parsed_json은 null.
2. API 호출 실패 → 비동기 재시도 1회, 실패 시 사용자에게 "정리 실패, 그대로 등록됨" 토스트.
3. 비용 한도: 일 100건 초과 시 알림 (대규모 악용 방지).

## 비용 추정

- haiku 입력 $0.80/1M / 출력 $4/1M
- 평균 입력 200 토큰 + 출력 150 토큰 = ~$0.00076 ≈ ₩1/건
- 월 1,000건 = ₩1,000
- 월 10,000건 = ₩10,000

매우 저렴. 비용 부담 0.
