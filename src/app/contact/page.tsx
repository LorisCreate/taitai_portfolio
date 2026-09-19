import { PageTitle } from "@/components/page-title";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact｜たいたい",
};

export default function ContactPage() {
  return (
    <main className="bg-washi">
      <div className="mx-auto max-w-[1200px] px-6 pb-28 md:px-8">
      <PageTitle en="contact" ja="お問い合わせ" />

      <section className="mt-12 flex flex-col gap-14 md:mt-20 md:flex-row md:justify-between md:gap-16 lg:gap-24">
        <div className="max-w-[384px]">
          <p className="text-[16px] leading-8 tracking-[0.05em]">
            案件のご相談や展示会の内容につきましては、下記のフォームよりお気軽にお問い合わせください。内容を確認し次第ご連絡いたします。送信ボタンを押す前に、必ず入力内容をご確認いただきますようお願いいたします。
          </p>
        </div>
        <div className="w-full max-w-[720px]">
          <ContactForm />
        </div>
      </section>
      </div>
    </main>
  );
}
