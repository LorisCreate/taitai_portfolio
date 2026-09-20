import { PageTitle } from "@/components/page-title";
import { eventNotices } from "@/lib/events";

export const metadata = {
  title: "Event｜たいたい",
};

export default function EventPage() {
  return (
    <main className="bg-washi">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
        <PageTitle en="event" ja="お知らせ" />

        {eventNotices.length === 0 ? (
          <p className="mt-16 text-center text-[16px] leading-8">
            現在お知らせはありません。
          </p>
        ) : (
          <div className="mt-16">
            <div className="hidden border-b border-black/20 pb-4 md:grid md:grid-cols-[160px_200px_1fr] md:gap-8">
              <p className="text-[16px] leading-8 tracking-[0.08em]">更新日</p>
              <p className="text-[16px] leading-8 tracking-[0.08em]">イベント日</p>
              <p className="text-[16px] leading-8 tracking-[0.08em]">内容</p>
            </div>
            <ul>
              {eventNotices.map((item) => (
                <li
                  key={item.id}
                  className="grid gap-2 border-b border-black/20 py-8 md:grid-cols-[160px_200px_1fr] md:gap-8 md:py-8"
                >
                  <p className="ff-en text-[16px] leading-8 tracking-[0.08em]">
                    <span className="md:hidden">更新日　</span>
                    {item.updated}
                  </p>
                  <p className="text-[16px] leading-8 tracking-[0.08em]">
                    <span className="md:hidden">イベント日　</span>
                    {item.when}
                  </p>
                  <p className="text-[16px] leading-8">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
