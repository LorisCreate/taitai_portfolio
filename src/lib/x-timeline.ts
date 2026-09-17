export const X_SCREEN_NAME = "taitai_pon";

export type XPost = {
  id: string;
  url: string;
  text: string;
  createdLabel: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  photos: string[];
  reposted: boolean;
};

type FxStatus = {
  id?: string;
  url?: string;
  text?: string;
  created_timestamp?: number;
  possibly_sensitive?: boolean;
  author?: {
    name?: string;
    screen_name?: string;
    avatar_url?: string;
  };
  media?: {
    photos?: { url?: string }[];
  };
  reposted_by?: {
    screen_name?: string;
  } | null;
};

type FxTimeline = {
  results?: FxStatus[];
};

function formatDate(timestamp?: number) {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function compactPhoto(url: string) {
  return url.replace("name=orig", "name=small");
}

export async function getXTimeline(limit = 10): Promise<XPost[]> {
  const response = await fetch(
    `https://api.fxtwitter.com/2/profile/${X_SCREEN_NAME}/statuses?count=20`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 180 },
    },
  );

  if (!response.ok) {
    throw new Error(`X timeline fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as FxTimeline;
  const posts: XPost[] = [];

  for (const item of data.results ?? []) {
    if (!item.id || !item.url || item.possibly_sensitive) continue;

    const photos = (item.media?.photos ?? [])
      .map((photo) => photo.url)
      .filter((url): url is string => Boolean(url))
      .slice(0, 2)
      .map(compactPhoto);

    posts.push({
      id: item.id,
      url: item.url,
      text: (item.text ?? "").trim(),
      createdLabel: formatDate(item.created_timestamp),
      authorName: item.author?.name ?? X_SCREEN_NAME,
      authorHandle: item.author?.screen_name ?? X_SCREEN_NAME,
      authorAvatar: item.author?.avatar_url ?? "",
      photos,
      reposted: Boolean(item.reposted_by?.screen_name),
    });

    if (posts.length >= limit) break;
  }

  return posts;
}
