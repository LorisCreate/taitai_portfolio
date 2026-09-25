export const site = {
  name: "ATELIER",
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
export const showIllustration = true;

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

export const aboutPortraitHome = "/about/aboutPortrait01.jpg";
export const aboutPortraitProfile = "/about/aboutPortrait02.jpg";

export const photoImages = ["/live2d/live2d_image_01.jpg"];

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
