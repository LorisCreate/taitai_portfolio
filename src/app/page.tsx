import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/text-link";
import { WorksSlider } from "@/components/works-slider";
import {
  aboutPortrait,
  designImages,
  instagramFeed,
  news,
  photoImages,
  site,
} from "@/lib/site";

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <HeroSlider />

        <section className="relative z-10 mt-12 flex justify-end md:-mt-12">
          <Reveal className="w-full bg-white px-6 py-8 md:w-[42%] md:px-9 md:py-8">
            <div className="flex items-center justify-between">
              <h2 className="ff-en text-[15px] tracking-[0.14em]">what’s new</h2>
              <TextLink href="/event">all view</TextLink>
            </div>
            <div className="mt-5 space-y-1">
              {news.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex gap-4 py-1 text-[12px] md:text-[13px]"
                >
                  <span className="ff-en relative min-w-[88px] pr-4 after:absolute after:top-1/2 after:right-0 after:h-3.5 after:w-px after:-translate-y-1/2 after:bg-black">
                    {item.date}
                  </span>
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <Reveal
          as="section"
          id="about"
          className="mt-16 grid items-end gap-10 md:mt-24 md:grid-cols-[1.15fr_0.85fr] md:gap-16"
        >
          <div className="order-2 md:order-1">
            <h2 className="ff-mi text-[36px] leading-[1.55] tracking-[0.28em] md:text-[52px]">
              わたしの
              <br />
              こと
            </h2>
            <p className="ff-en mt-4 text-[16px] tracking-[0.16em] md:text-[18px]">
              about
            </p>
            <p className="mt-10">
              わくわくすること。ドキドキすること。
              <br />
              楽しいことや悲しさや切なさなど
            </p>
            <p className="my-5 text-[16px] tracking-[0.1em] md:text-[18px]">
              「見ていたい！」
            </p>
            <p>
              と感じられるものを創作し続けたい
              <br />
              そんなクリエイターを目指してます
            </p>
            <div className="mt-6 text-right">
              <TextLink href="/profile">my profile</TextLink>
            </div>
          </div>
          <figure className="order-1 overflow-hidden md:order-2">
            <Image
              src={aboutPortrait}
              alt="プロフィール写真"
              width={770}
              height={770}
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>

        <Reveal as="section" id="design" className="mt-24 md:mt-36">
          <h2 className="ff-mi text-[28px] tracking-[0.2em] md:text-[36px]">
            デザインしてます
          </h2>
          <p className="ff-en mt-1 text-[16px] tracking-[0.16em] md:text-[18px]">
            design
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
            {designImages.map((src, i) => (
              <figure
                key={src}
                className={i === 1 ? "hidden md:block" : undefined}
              >
                <Image
                  src={src}
                  alt="デザインの仕事"
                  width={604}
                  height={604}
                  className="aspect-square h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p>
              大好きな “ ものづくり ” を仕事にして13年目。
              <br className="hidden md:block" />
              ディレクションからデザイン、コーディングまでワンストップで担当できる
              <br className="hidden md:block" />
              WEBサイト制作をメインに、デザインにかかわる様々なお仕事を承っております。
            </p>
            <div className="text-right">
              <TextLink href="/gallery">view more</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="photograph" className="mt-24 md:mt-36">
          <h2 className="ff-mi text-[28px] tracking-[0.2em] md:text-[36px]">
            写真を撮ります
          </h2>
          <p className="ff-en mt-1 text-[16px] tracking-[0.16em] md:text-[18px]">
            photograph
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
            {photoImages.map((src, i) => (
              <figure
                key={src}
                className={i === 1 ? "hidden md:block" : undefined}
              >
                <Image
                  src={src}
                  alt="撮影作品"
                  width={604}
                  height={604}
                  className="aspect-square h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p>
              フィルムカメラ、デジタルカメラを使って写真を撮っています。
              <br className="hidden md:block" />
              光の入ったあたたかな雰囲気の写真や、日常・旅先での四季を感じられるような写真が得意です。
              <br className="hidden lg:block" />
              観光地や宿泊施設のプロモーション、ご家族のケの日・ハレの日の撮影など、お気軽にご相談ください。
            </p>
            <div className="text-right">
              <TextLink href="/gallery">view more</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="works" className="mt-24 md:mt-36">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="ff-en text-[36px] tracking-[0.18em] md:text-[52px]">
              my works
            </h2>
            <span className="ff-en bg-black px-5 py-1 text-[12px] tracking-[0.14em] text-white md:text-[14px]">
              pick up
            </span>
          </div>
          <div className="mt-8 max-w-[820px]">
            <WorksSlider />
          </div>
          <div className="mt-8 text-right">
            <TextLink href="/gallery">all view</TextLink>
          </div>
        </Reveal>

        <Reveal as="section" id="instagram" className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-end gap-4">
            <h2 className="ff-en text-[32px] tracking-[0.18em] md:text-[36px]">
              instagram
            </h2>
            <p className="ff-mi tracking-[0.16em]">インスタグラム</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {instagramFeed.map((src) => (
              <a
                key={src}
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden"
              >
                <Image
                  src={src}
                  alt="Instagramの投稿"
                  width={400}
                  height={400}
                  className="aspect-square h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href={site.instagram} external>
              follow @atelier516
            </TextLink>
          </div>
        </Reveal>
      </div>

      <Reveal as="section" id="contact" className="mt-28 bg-[#f3f3f3] md:mt-40">
        <div className="mx-auto max-w-[1200px] px-6 py-16 text-center md:px-8 md:py-20">
          <h2 className="ff-en text-[48px] leading-none tracking-[0.18em] md:text-[64px]">
            contact
          </h2>
          <div className="mx-auto mt-10 max-w-md">
            <Link
              href="/contact"
              className="block border border-black py-4 text-[14px] tracking-[0.12em] transition-opacity hover:opacity-55"
            >
              お問合わせはこちらから
            </Link>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-[13px] md:text-[14px]">
            お仕事のご依頼、クリエイティブなことに関するご相談、
            <br className="hidden md:block" />
            こんなこと一緒にやってみない？という楽しいお誘いなどなど
            <br className="hidden md:block" />
            何でもお気軽にどうぞ。お問合わせお待ちしております。
          </p>
        </div>
      </Reveal>
    </main>
  );
}
