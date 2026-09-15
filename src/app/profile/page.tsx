import Image from "next/image";
import { TextLink } from "@/components/text-link";
import { aboutPortrait } from "@/lib/site";

export const metadata = {
  title: "Profile｜ATELIER 516",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="page-hero">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-end">
          <h1 className="ff-mi text-[32px] tracking-[0.28em] md:text-[42px]">わたしのこと</h1>
          <p className="ff-en text-[14px] tracking-[0.16em]">profile</p>
        </div>
      </div>

      <section className="mt-16 grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <figure>
          <Image
            src={aboutPortrait}
            alt="佐藤 光"
            width={800}
            height={1000}
            className="h-auto w-full object-cover"
          />
        </figure>
        <div>
          <p className="ff-en text-[13px] tracking-[0.16em]">photographer / designer</p>
          <h2 className="ff-mi mt-3 text-[28px] tracking-[0.2em] md:text-[36px]">佐藤 光</h2>
          <p className="ff-en mt-1 text-[14px] tracking-[0.14em]">Hikari Sato</p>
          <p className="mt-8">
            仙台・秋保を拠点に活動するフリーランスのフォトグラファー／デザイナー。
            広告写真を中心に、WEBサイトのディレクションからデザイン、構築までワンストップで担当しています。
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="ff-en text-[12px] tracking-[0.16em]">1988</dt>
              <dd>宮城県生まれ。</dd>
            </div>
            <div>
              <dt className="ff-en text-[12px] tracking-[0.16em]">2010</dt>
              <dd>制作会社にて商品撮影とグラフィックデザインのアシスタントを経験。</dd>
            </div>
            <div>
              <dt className="ff-en text-[12px] tracking-[0.16em]">2016</dt>
              <dd>ATELIER 516として独立。フード、建築、ポートレート、WEB制作を中心に活動。</dd>
            </div>
          </dl>
          <div className="mt-10">
            <TextLink href="/contact">contact</TextLink>
          </div>
        </div>
      </section>
    </main>
  );
}
