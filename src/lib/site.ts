export const site = {
  name: "ATELIER 516",
  person: "たいたい",
  role: "PHOTOGRAPHER",
  tagline:
    "Illustration,Manga,Live2D\nNature,Web,Column\nIyashi,wakuwaku and more and more",
  instagram: "https://www.instagram.com/taitai_illust/?hl=ja",
  x: "https://x.com/taitai_pon",
  pixiv: "https://www.pixiv.net/users/37033465",
  contactTo: "taitaisubad@gmail.com",
};

/** Set to true to show the homepage my works pickup again. */
export const showMyWorks = false;

/** Set to true to show the homepage illustration block again. */
export const showIllustration = false;

/** Set to true to show the homepage manga block again. */
export const showManga = true;

/** Set to true to publish /gallery/[slug] pages and the overlay "view" link. */
export const showGalleryDetailPages = false;

export const navItems = [
  { href: "/gallery", label: "Gallery" },
  { href: "/profile", label: "Profile" },
  { href: "/event", label: "Event" },
  { href: "/contact", label: "Contact" },
] as const;

export const news = [
  {
    date: "2026.09.01",
    title: "秋のポートレート撮影会を開催します",
    href: "/event",
  },
  {
    date: "2026.06.12",
    title: "2026年度のご依頼受付を開始しました",
    href: "/contact",
  },
];

export const aboutPortraitHome = "/about/aboutPortrait01.jpg";
export const aboutPortraitProfile = "/about/aboutPortrait02.jpg";

export const designImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
];

export const photoImages = [
  "/live2d/live2d_image_01.jpg",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
];

export const works = [
  {
    id: "01",
    title: "tabisuru kissa",
    meta: "design | 2019 ~",
    body: "旅する喫茶の世界観を、サイトから店舗グラフィックまで一貫してデザイン。高円寺と福岡・うきはの2店舗の立ち上げから、今も続くブランドづくりを担当しています。",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "02",
    title: "portfolio pack",
    meta: "web | 2019 ~",
    body: "フリーランスのフォトグラファーやデザイナーの独立を支えるポートフォリオサイト。手頃な価格でも、写真が主役になる余白とリズムを大切にしています。",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a37e15?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "03",
    title: "light room lab",
    meta: "design | 2021.3",
    body: "写真の学びと展示をつなぐメディアのサイトリニューアル。記事、ギャラリー、イベント告知まで、撮影の熱量が伝わる情報設計とビジュアルを担当しました。",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "04",
    title: "Ever Green Wedding",
    meta: "renewal | 2023.4",
    body: "森や草原、澄んだ空気から感じるやさしい色と質感をテーマにしたオーダーウェディング。サイトリニューアルで、光の入り方まで意識した写真構成にしました。",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
];

export const galleryFilters = ["ALL", "オリジナル", "二次創作", "Live2D"] as const;

export type GalleryTag = Exclude<(typeof galleryFilters)[number], "ALL">;

export type GalleryWork = {
  slug: string;
  title: string;
  tag: GalleryTag | null;
  date: string;
  image: string;
  images: string[];
  body: string;
};

export const galleryCategories = galleryFilters;

export const events = [
  {
    date: "2026.11.08 – 11.23",
    place: "仙台・秋保",
    title: "個展「あたたかな余白」",
    body: "日常の光と、旅先で出会った景色を並べる写真展。会期中は週末のみ在廊します。",
  },
  {
    date: "2026.09.27",
    place: "仙台オフィス",
    title: "秋のポートレート撮影会",
    body: "自然光を活かした少人数制の撮影会。服装の相談からプリントまでサポートします。",
  },
  {
    date: "2026.04.12",
    place: "オンライン",
    title: "写真とウェブの collab talk",
    body: "ポートフォリオサイトの作り方と、写真の見せ方についてのトークイベント。",
  },
];
