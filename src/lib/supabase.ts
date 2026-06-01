import { createClient } from "@supabase/supabase-js";

/**
 * 브라우저용 Supabase 클라이언트 (anon 키만 사용).
 * service_role 키는 절대 여기서 쓰지 않는다 — 서버 전용 (D+1에 server.ts 분리).
 *
 * stub: D+1에 실제 URL/키 연결 + lib/supabase/{client,server}.ts 로 분리 예정.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
