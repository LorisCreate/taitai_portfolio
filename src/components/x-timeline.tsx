import { getXTimeline, X_SCREEN_NAME } from "@/lib/x-timeline";

export async function XTimeline() {
  let posts: Awaited<ReturnType<typeof getXTimeline>> = [];
  let failed = false;

  try {
    posts = await getXTimeline();
  } catch {
    failed = true;
  }

  if (failed || posts.length === 0) {
    return (
      <p className="text-[16px] leading-8 tracking-[0.08em]">
        タイムラインを読み込めませんでした。
        <a
          className="ml-2 underline"
          href={`https://x.com/${X_SCREEN_NAME}`}
          target="_blank"
          rel="noreferrer"
        >
          @{X_SCREEN_NAME} をXで見る
        </a>
      </p>
    );
  }

  return (
    <div
      className="max-h-[520px] overflow-y-auto border-t border-black/15 px-0"
      aria-label={`@${X_SCREEN_NAME} のXタイムライン`}
    >
      {posts.map((post) => (
        <article key={post.id} className="border-b border-black/15 py-4">
          {post.reposted ? (
            <p className="mb-2 pl-12 text-[16px] leading-8 tracking-[0.08em] text-neutral-500">
              @{X_SCREEN_NAME} がリポスト
            </p>
          ) : null}
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="flex gap-4 text-inherit no-underline transition-opacity hover:opacity-70"
          >
            {post.authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.authorAvatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="h-10 w-10 shrink-0 rounded-full bg-neutral-200" />
            )}
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-[16px] leading-8">
                <span className="font-medium tracking-[0.04em]">{post.authorName}</span>
                <span className="ff-en text-[16px] text-neutral-500">
                  @{post.authorHandle}
                </span>
                {post.createdLabel ? (
                  <span className="ff-en text-[16px] text-neutral-400">
                    {post.createdLabel}
                  </span>
                ) : null}
              </p>
              {post.text ? (
                <p className="mt-2 whitespace-pre-wrap text-[16px] leading-8 tracking-[0.04em]">
                  {post.text}
                </p>
              ) : null}
              {post.photos.length > 0 ? (
                <div
                  className={`mt-4 overflow-hidden ${
                    post.photos.length > 1 ? "grid grid-cols-2 gap-2" : ""
                  }`}
                >
                  {post.photos.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
