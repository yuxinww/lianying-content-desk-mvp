import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "连盈内容台",
  description: "从客户需求与内容反馈出发，生成更值得拍的视频选题与执行脚本。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
