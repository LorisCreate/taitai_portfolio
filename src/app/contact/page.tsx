import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact｜たいたい",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-28 md:px-8">
      <hgroup className="pt-6 md:pt-10">
        <h1 className="ff-en text-[64px] leading-none tracking-[0.04em] md:text-[120px] lg:text-[160px]">
          Contact
        </h1>
        <p className="mt-3 text-[13px] tracking-[0.12em] md:mt-4 md:text-[16px]">
          お問い合わせ
        </p>
      </hgroup>

      <section className="mt-12 flex flex-col gap-14 md:mt-20 md:flex-row md:justify-between md:gap-16 lg:gap-24">
        <div className="max-w-[380px] space-y-4">
          <p className="text-[13px] leading-[1.9] tracking-[0.05em] md:text-[15px] md:leading-[1.7]">
            For inquiries regarding projects or interview requests, please use
            the form below. After reviewing your submission, our team will
            contact you. Kindly ensure your information is accurate before
            clicking the submit button.
          </p>
          <p className="text-[12px] leading-[2] tracking-[0.05em] text-black/60 md:text-[13px]">
            案件のご相談や取材のご依頼につきましては、下記のフォームよりお気軽にお問い合わせください。内容を確認し次第、担当者よりご連絡いたします。送信ボタンを押す前に、必ず入力内容をご確認いただきますようお願いいたします。
          </p>
        </div>
        <div className="w-full max-w-[720px]">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
