import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "捡漏飞行 - 特价机票发现平台",
  description: "全网特价，一眼看清，一键直达",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="pb-16">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
