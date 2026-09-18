import Image from "next/image";
import { PageTitle } from "@/components/page-title";
import { TextLink } from "@/components/text-link";
import { aboutPortrait } from "@/lib/site";

export const metadata = {
  title: "Profile｜ATELIER 516",
};

const timeline = [
  { year: "2016年", body: "外資直販の保険営業として活動" },
  { year: "2018年", body: "保険の代理営業へ転職" },
  { year: "2019年", body: "Webディレクターとしてファストファッションサイトを担当" },
  { body: "2020年からは実家の仕事をやりつつWeb製作などをしていました。" },
  { body: "2022年の秋からコロナ前にやっていた絵を描くことを再開。" },
  { body: "2023年からは同人活動をスタート" },
] as const;

export default function ProfilePage() {
  return (
    <main className="bg-washi">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <PageTitle en="profile" ja="わたしのこと" />

      <section className="mt-16 grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <figure>
          <Image
            src={aboutPortrait}
            alt="たいたい"
            width={800}
            height={1000}
            className="h-auto w-full object-cover"
          />
        </figure>
        <div>
          <h2 className="ff-mi text-[28px] tracking-[0.2em] md:text-[36px]">たいたい</h2>
          <p className="mt-8">
            関東のイベントを中心にイラストレーターや漫画を描いて活動しています。
            <br />
            女の子や背景画を主として描いています。読んでいてわくわくするもの
            <br />
            心がポカポカする作品からダークな世界まで幅広く描きます。
            <br />
            見ていてなにかを感じてもらえる世界をこれからも創作していきます。
          </p>

          <dl className="mt-12 space-y-6">
            {timeline.map((item) => (
              <div key={item.body}>
                {"year" in item ? (
                  <dt className="ff-en text-[12px] tracking-[0.16em]">{item.year}</dt>
                ) : null}
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-14">
            <h3 className="ff-mi text-[22px] tracking-[0.2em] md:text-[26px]">実績</h3>
            <p className="mt-5">漫画の構成</p>
            <p>部分的な線画やトーン貼りなど。</p>
          </section>

          <div className="mt-12">
            <TextLink href="/contact">contact</TextLink>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
