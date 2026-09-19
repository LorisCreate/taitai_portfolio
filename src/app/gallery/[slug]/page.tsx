import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/page-title";
import { TextLink } from "@/components/text-link";
import { galleryWorks, getGalleryWork } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return galleryWorks.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const work = getGalleryWork(slug);
  return {
    title: work ? `${work.title}｜Gallery` : "Gallery",
  };
}

export default async function GalleryWorkPage({ params }: Props) {
  const { slug } = await params;
  const work = getGalleryWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <PageTitle en={work.slug.replaceAll("-", " ")} ja={work.title} />

      <p className="ff-en mt-10 text-[13px] tracking-[0.14em]">{work.date}</p>
      <p className="mt-6 max-w-2xl">{work.body}</p>

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
