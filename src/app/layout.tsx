import type { Metadata } from "next";
import { Jost, Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-sans-jp",
  weight: ["300", "400", "500"],
});

const mincho = Shippori_Mincho({
  variable: "--font-mincho",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "ATELIER 516｜たいたい",
  description:
    "デザインと写真で、大切な人やモノをより輝かせるクリエイター。WEB制作、グラフィック、写真撮影をお受けしています。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${jost.variable} ${notoSans.variable} ${mincho.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black">
        <SiteHeader />
        <div className="pt-[88px] md:pt-[110px] lg:pt-[130px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
