import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/text-link";
import { WorksSlider } from "@/components/works-slider";
import { XTimeline } from "@/components/x-timeline";
import {
  aboutPortraitHome,
  designImages,
  mangaImages,
  news,
  photoImages,
  showMyWorks,
  site,
} from "@/lib/site";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <section className="relative z-10 mt-8 flex justify-end md:-mt-28">
          <Reveal className="bg-washi w-full px-6 py-8 md:w-[42%] md:px-8 md:py-8">
            <div className="flex items-center justify-between">
              <h2 className="ff-en text-[16px] leading-8 tracking-[0.14em]">what’s new</h2>
              <TextLink href="/event">all view</TextLink>
            </div>
            <div className="mt-4 space-y-2">
              {news.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex gap-4 py-2 text-[16px] leading-8"
                >
                  <span className="ff-en relative min-w-[88px] pr-4 after:absolute after:top-1/2 after:right-0 after:h-4 after:w-px after:-translate-y-1/2 after:bg-black">
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
            <h2 className="ff-mi text-[40px] leading-10 tracking-[0.28em] md:text-[48px] md:leading-[56px]">
              わたしの
              <br />
              こと
            </h2>
            <p className="ff-en mt-4 text-[16px] leading-8 tracking-[0.16em]">
              about
            </p>
            <p className="mt-10">
              わくわくすること。ドキドキすること。
              <br />
              楽しいことや悲しさや切なさなど
            </p>
            <p className="my-4 text-[16px] leading-8 tracking-[0.1em]">
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
              src={aboutPortraitHome}
              alt="プロフィール写真"
              width={770}
              height={770}
              className="h-auto w-full object-cover"
            />
          </figure>
        </Reveal>

        <Reveal as="section" id="illustration" className="mt-24 md:mt-36">
            <h2 className="ff-mi text-[32px] leading-8 tracking-[0.2em] md:text-[40px] md:leading-10">
            イラスト描いています
          </h2>
          <p className="ff-en mt-2 text-[16px] leading-8 tracking-[0.16em]">
            illustration
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {designImages.map((src, i) => (
              <figure
                key={src}
                className={i === 1 ? "hidden md:block" : undefined}
              >
                <Image
                  src={src}
                  alt="イラスト"
                  width={604}
                  height={604}
                  className="aspect-square h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p>
              本格的にイラストを再開し約3年。オリジナル中心にして今は二次創作なども描いて楽しく活動をさせていただいております。
              <br className="hidden md:block" />
              手にしてくれた方が楽しんでもらえる、企業様が求めるものをできるようにお仕事をしていくという気持ちを第一に活動しております。
              <br className="hidden md:block" />
              挿し絵、表紙などイラストに関わる様々なお仕事を承っております。
            </p>
            <div className="text-right">
              <TextLink href="/gallery">view more</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="animation" className="mt-24 md:mt-36">
            <h2 className="ff-mi text-[32px] leading-8 tracking-[0.2em] md:text-[40px] md:leading-10">
            Live2D作ります
          </h2>
          <p className="ff-en mt-2 text-[16px] leading-8 tracking-[0.16em]">
            animation
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {photoImages.map((src, i) => (
              <figure
                key={src}
                className={i === 1 ? "hidden md:block" : undefined}
              >
                <Image
                  src={src}
                  alt="Live2D"
                  width={604}
                  height={604}
                  className="aspect-square h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p>
              Vtuberモデルなどに用いられるLive2Dを制作しています。
              <br className="hidden md:block" />
              少しずつGalleryページに増やしていけるようにしたいと思いますのでぜひぜひ楽しんでいってもらえたらうれしいです。
            </p>
            <div className="text-right">
              <TextLink href="/gallery">view more</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="manga" className="mt-24 md:mt-36">
            <h2 className="ff-mi text-[32px] leading-8 tracking-[0.2em] md:text-[40px] md:leading-10">
            漫画
          </h2>
          <p className="ff-en mt-2 text-[16px] leading-8 tracking-[0.16em]">
            manga
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {mangaImages.map((src, i) => (
              <figure
                key={src}
                className={i === 1 ? "hidden md:block" : undefined}
              >
                <Image
                  src={src}
                  alt="漫画"
                  width={604}
                  height={604}
                  className="aspect-square h-auto w-full object-cover"
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <p>
              まだまだ未熟ですが漫画も描いてます。
              <br />
              色々悩みながら進もうとしてたら知識つけなければとなってしまい頭でっかちになってしまったけど、少しずつ描いています。
              <br />
              もしよかったら読んでいってもらえたら嬉しいです。
            </p>
            <div className="text-right">
              <TextLink href={site.pixiv} external en={false}>
                pixivで読む
              </TextLink>
            </div>
          </div>
        </Reveal>

        {showMyWorks ? (
          <Reveal as="section" id="works" className="mt-24 md:mt-36">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="ff-en text-[40px] leading-10 tracking-[0.18em] md:text-[48px] md:leading-[56px]">
                my works
              </h2>
              <span className="ff-en bg-black px-4 py-2 text-[16px] leading-8 tracking-[0.14em] text-white">
                pick up
              </span>
            </div>
            <div className="mt-8 max-w-[816px]">
              <WorksSlider />
            </div>
            <div className="mt-8 text-right">
              <TextLink href="/gallery">all view</TextLink>
            </div>
          </Reveal>
        ) : null}

        <Reveal as="section" id="sns" className="mt-24 md:mt-32">
          <div className="mx-auto max-w-[720px]">
            <div className="flex flex-wrap items-end gap-4">
              <h2 className="ff-en text-[32px] leading-8 tracking-[0.16em] md:text-[40px] md:leading-10">
                x
              </h2>
              <p className="ff-mi text-[16px] leading-8 tracking-[0.16em]">エックス</p>
            </div>
            <div className="mt-8">
              <Suspense
                fallback={
                  <p className="text-[16px] leading-8 tracking-[0.08em] text-neutral-500">
                    タイムラインを読み込み中…
                  </p>
                }
              >
                <XTimeline />
              </Suspense>
            </div>
            <div className="mt-8">
              <TextLink href={site.x} external className="text-[16px] leading-8">
                follow @taitai_pon
              </TextLink>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal as="section" id="contact" className="mt-28 md:mt-40">
        <div className="mx-auto max-w-[1200px] px-6 py-16 text-center md:px-8 md:py-20">
          <h2 className="ff-en text-[48px] leading-none tracking-[0.18em] md:text-[64px]">
            contact
          </h2>
          <div className="mx-auto mt-8 max-w-md">
            <Link
              href="/contact"
              className="block border border-black py-4 text-[16px] leading-8 tracking-[0.12em] transition-opacity hover:opacity-55"
            >
              お問合わせはこちらから
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-8 md:text-[16px]">
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
