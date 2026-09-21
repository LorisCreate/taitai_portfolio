import type { Metadata } from "next";
import { Jost, Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-HNVC1XM8XS";

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
  verification: {
    google: "X235aG3uIOD2QjwjXuVci2pJvoyoq0CjGy3L4yoBibM",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${jost.variable} ${notoSans.variable} ${mincho.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full text-black">
        <SiteHeader />
        <div className="pt-[72px] md:pt-[88px] lg:pt-[96px]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
