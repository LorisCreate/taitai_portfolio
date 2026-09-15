import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-24 text-center md:px-8">
      <p className="ff-en tracking-[0.2em]">404</p>
      <p className="mt-4">お探しのページは見つかりませんでした。</p>
      <Link href="/" className="ff-en mt-8 inline-block text-[13px] tracking-[0.16em] underline">
        back to home
      </Link>
    </main>
  );
}
