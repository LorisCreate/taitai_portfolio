"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

function FieldLabel({
  htmlFor,
  title,
  hint,
  required,
}: {
  htmlFor: string;
  title: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-0.5">
      <span className="text-[15px] tracking-[0.08em]">
        {title}
        {required ? <span className="ml-1 text-[12px] text-[#cf0000]">*</span> : null}
      </span>
      {hint ? (
        <span className="ff-en text-[11px] tracking-[0.12em] text-black/50">{hint}</span>
      ) : null}
    </label>
  );
}

const inputClass =
  "w-full border-0 border-b border-black bg-transparent px-0 py-3 text-[14px] tracking-[0.06em] outline-none placeholder:text-black/30";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const type = String(data.get("type") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!type || !name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 600));
    form.reset();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="py-8">
        <p className="ff-en text-[28px] tracking-[0.08em] md:text-[36px]">Thank you</p>
        <p className="mt-4 text-[13px] leading-[1.9]">
          お問い合わせを受け付けました。内容を確認し次第、担当者よりご連絡いたします。
        </p>
        <button type="button" className="contact-submit mt-10" onClick={() => setStatus("idle")}>
          送信
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="type" title="お問い合わせ種別" hint="Type" required />
        <select
          id="type"
          name="type"
          required
          defaultValue=""
          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none"><path stroke="%23000" d="M1 1.5 6 6.5 11 1.5"/></svg>')] bg-[length:12px_8px] bg-[right_0_center] bg-no-repeat pr-6`}
        >
          <option value="" hidden>
            選択してください
          </option>
          <option value="お仕事依頼">お仕事依頼</option>
          <option value="展示会のご案内">展示会のご案内</option>
          <option value="その他（お問い合わせ内容に詳細をお願いします）">
            その他（お問い合わせ内容に詳細をお願いします）
          </option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="name" title="お名前" hint="Name" required />
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="田中 太郎"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="kana" title="送り仮名" hint="ナマエ" />
        <input
          id="kana"
          name="kana"
          type="text"
          placeholder="タナカ タロウ"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="company" title="会社名" hint="Company Name" />
        <input id="company" name="company" type="text" className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="email" title="メールアドレス" hint="Mail" required />
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="xxxcccvvv@aaamail.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="message" title="お問い合わせ内容" required />
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className={`${inputClass} min-h-[10rem] resize-y border border-black px-3 py-3`}
        />
      </div>

      {status === "error" ? (
        <p className="text-[13px]">必須項目をご入力ください。</p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="contact-submit mt-2">
        {status === "sending" ? "送信中" : "送信"}
      </button>
    </form>
  );
}
