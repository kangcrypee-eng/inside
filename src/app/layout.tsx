import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "인사이드 (Inside) — 역방향 부동산 매칭",
  description:
    "원하는 매물을 요청하면 공인중개사가 직접 매물을 제안하는 양면 마켓플레이스.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
