import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact｜ATELIER 516",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="page-hero">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-end">
          <h1 className="ff-mi text-[32px] tracking-[0.28em] md:text-[42px]">お問い合わせ</h1>
          <p className="ff-en text-[14px] tracking-[0.16em]">contact</p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-xl">
        <p>
          撮影のご相談、WEB制作、デザインのご依頼はこちらから。必要事項をご入力のうえ送信してください。
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
