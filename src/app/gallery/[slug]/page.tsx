import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { PageTitle } from "@/components/page-title";
import { TextLink } from "@/components/text-link";
import { getGalleryWork, listGalleryWorks } from "@/lib/gallery";
import { showGalleryDetailPages } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  if (!showGalleryDetailPages) return [];
  return listGalleryWorks().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props) {
  if (!showGalleryDetailPages) {
    return { title: "Gallery", robots: { index: false, follow: false } };
  }
  const { slug } = await params;
  const work = getGalleryWork(slug);
  return {
    title: work ? `${work.title}｜Gallery` : "Gallery",
  };
}

export default async function GalleryWorkPage({ params }: Props) {
  if (!showGalleryDetailPages) {
    redirect("/gallery");
  }

  const { slug } = await params;
  const work = getGalleryWork(slug);

  if (!work) {
    notFound();
  }

  const en = decodeURIComponent(work.slug).replaceAll("-", " ");

  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <PageTitle en={en} ja={work.title} />

      {work.date ? (
        <p className="ff-en mt-8 text-[16px] leading-8 tracking-[0.14em]">{work.date}</p>
      ) : null}
      {work.body ? <p className="mt-6 max-w-2xl">{work.body}</p> : null}

      <div className="mt-12 space-y-8">
        {work.images.map((src) => (
          <figure key={src}>
            <Image
              src={src}
              alt={work.title}
              width={1400}
              height={900}
              className="h-auto w-full object-cover"
            />
          </figure>
        ))}
      </div>

      <div className="mt-14">
        <TextLink href="/gallery">back to gallery</TextLink>
      </div>
    </main>
  );
}
