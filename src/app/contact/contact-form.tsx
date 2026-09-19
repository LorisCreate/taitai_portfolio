"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

function FieldLabel({
  htmlFor,
  en,
  ja,
  required,
}: {
  htmlFor: string;
  en: string;
  ja: string;
  required: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2">
      <span className="text-[16px] leading-8 tracking-[0.05em]">{en}</span>
      <span className="text-[16px] leading-8">/</span>
      <span className="text-[16px] leading-8 tracking-[0.05em] text-black/60">{ja}</span>
      {required ? <span className="text-[16px] leading-8 text-[#cf0000]">*</span> : null}
    </label>
  );
}

const inputClass =
  "w-full border-0 border-b border-black bg-transparent px-2 py-4 text-[16px] leading-8 tracking-[0.05em] outline-none placeholder:text-black/35";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("必須項目をご入力ください。");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const type = String(data.get("type") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!type || !name || !email || !message) {
      setErrorMessage("必須項目をご入力ください。");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, company, email, message }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setErrorMessage(payload.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("送信に失敗しました。通信状況をご確認のうえ、再度お試しください。");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-8">
        <p className="ff-en text-[32px] leading-8 tracking-[0.08em] md:text-[40px] md:leading-10">Thank you</p>
        <p className="mt-4 text-[16px] leading-8">
          お問い合わせを受け付けました。内容を確認し次第、担当者よりご連絡いたします。
        </p>
        <button
          type="button"
          className="mt-8 flex h-10 items-center justify-center rounded-full border border-black px-8 text-[16px] leading-8 tracking-[0.05em]"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="type" en="Type" ja="お問い合わせ種別" required />
        <select
          id="type"
          name="type"
          required
          defaultValue=""
          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" fill="none"><path stroke="%23000" d="M1 1.5 8 6.5 15 1.5"/></svg>')] bg-[length:16px_8px] bg-[right_8px_center] bg-no-repeat pr-8`}
        >
          <option value="" hidden>
            お問い合わせ種別を選択してください。
          </option>
          <option value="お仕事依頼">お仕事依頼</option>
          <option value="展示会のご案内">展示会のご案内</option>
          <option value="その他（お問い合わせ内容に詳細をお願いします）">
            その他（お問い合わせ内容に詳細をお願いします）
          </option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="name" en="Name" ja="お名前" required />
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="お名前を入力してください。"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="company" en="Company name" ja="会社 組織名" required={false} />
        <input
          id="company"
          name="company"
          type="text"
          placeholder="所属する会社もしくは組織の名称を入力してください。"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="email" en="Mail Address" ja="メールアドレス" required />
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="メールアドレスを入力してください。"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel htmlFor="message" en="Message" ja="お問い合わせ内容" required />
        <textarea
          id="message"
          name="message"
          required
          placeholder="お問い合わせ内容をご記入ください。"
          rows={6}
          className={`${inputClass} min-h-[136px] resize-y`}
        />
      </div>

      {status === "error" ? (
        <p className="text-[16px] leading-8">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mx-auto mt-2 flex h-10 items-center justify-center gap-2 rounded-full border border-black px-8 text-[16px] leading-8 tracking-[0.05em] disabled:opacity-50"
        aria-label="Submit"
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="8"
              fill="none"
              viewBox="0 0 20 8"
              aria-hidden="true"
            >
              <path stroke="currentColor" d="M.5 4h18m0 0L15.247.5M18.5 4l-3.253 3.5" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
