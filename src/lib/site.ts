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

export const heroImages = [
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1487412941708-8c5d5d83d8e3?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
];

export const aboutPortrait =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80";

export const designImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
];

export const photoImages = [
  "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
];

export const mangaImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
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
  tag: GalleryTag;
  date: string;
  image: string;
  images: string[];
  body: string;
};

export const galleryWorks: GalleryWork[] = [
  {
    slug: "morning-table",
    title: "朝のテーブル",
    tag: "オリジナル",
    date: "2025.03",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "朝の光が差し込むテーブル。湯気と器の気配が残る、日常のフードカットです。宿泊施設の朝食ページのために撮影しました。",
  },
  {
    slug: "window-portrait",
    title: "窓辺の肖像",
    tag: "二次創作",
    date: "2025.01",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "レース越しの光で撮ったポートレート。輪郭を強くせず、肌のトーンと空気感を優先しています。",
  },
  {
    slug: "forest-wedding",
    title: "森のウェディング",
    tag: "オリジナル",
    date: "2024.10",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "森の中での挙式。グリーンとドレスの白がほどよく分かれるよう、露出は少しだけ抑えめにしています。",
  },
  {
    slug: "architecture-light",
    title: "建築と光",
    tag: "オリジナル",
    date: "2024.08",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8627?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8627?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "開口部から落ちる光を軸にした建築写真。空間の広さより、時間帯の気配が残るように撮っています。",
  },
  {
    slug: "flower-and-shadow",
    title: "花と影",
    tag: "二次創作",
    date: "2024.05",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "窓際で撮ったスチル。花の輪郭より、影の落ち方を先に決めてフレーミングしました。",
  },
  {
    slug: "afternoon-away",
    title: "旅先の午後",
    tag: "二次創作",
    date: "2024.03",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "旅先で出会った午後の景色。観光地らしい記号は外し、その土地の光だけが残るようにしています。",
  },
  {
    slug: "studio-portrait",
    title: "スタジオポートレート",
    tag: "Live2D",
    date: "2023.11",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "秋保スタジオでのポートレート。レフは最小限にし、自然光に近いグラデーションを残しました。",
  },
  {
    slug: "night-dining",
    title: "夜のダイニング",
    tag: "Live2D",
    date: "2023.09",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "夜のレストラン撮影。照明は既存のものを活かし、料理が主張しすぎないトーンに整えています。",
  },
  {
    slug: "paper-and-type",
    title: "紙と文字",
    tag: "オリジナル",
    date: "2023.06",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "印刷物とウェブのトーンを揃えたグラフィック。余白と文字組を先に決め、写真はそのあとに載せています。",
  },
  {
    slug: "site-for-atelier",
    title: "アトリエのサイト",
    tag: "Live2D",
    date: "2023.04",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a37e15?auto=format&fit=crop&w=1400&q=80",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a37e15?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80",
    ],
    body: "フォトグラファーのポートフォリオサイト。写真が主役になるよう、文字は小さく、余白は広く取っています。",
  },
];

export const galleryCategories = galleryFilters;

export function getGalleryWork(slug: string) {
  return galleryWorks.find((work) => work.slug === slug);
}

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
