import { events } from "@/lib/site";

export const metadata = {
  title: "Event｜ATELIER 516",
};

export default function EventPage() {
  return (
    <main className="bg-washi">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="page-hero">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-end">
          <h1 className="ff-mi text-[32px] tracking-[0.28em] md:text-[42px]">お知らせ</h1>
          <p className="ff-en text-[14px] tracking-[0.16em]">event</p>
        </div>
      </div>

      {events.length === 0 ? (
        <p className="mt-16 text-center">現在公開中のイベントはありません。</p>
      ) : (
        <ul className="mt-16 divide-y divide-black/20 border-y border-black/20">
          {events.map((event) => (
            <li key={event.title} className="grid gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10">
              <div>
                <p className="ff-en text-[13px] tracking-[0.12em]">{event.date}</p>
                <p className="mt-1 text-[12px]">{event.place}</p>
              </div>
              <div>
                <h2 className="text-[16px] tracking-[0.1em] md:text-[18px]">{event.title}</h2>
                <p className="mt-3">{event.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}
