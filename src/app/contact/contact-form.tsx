"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const fields = [
  {
    name: "type",
    en: "Type",
    ja: "お問い合わせ種別",
    required: true,
    kind: "select" as const,
    placeholder: "お問い合わせ種別を選択してください。",
    options: ["お仕事のご依頼", "取材のご依頼", "その他"],
  },
  {
    name: "name",
    en: "Name",
    ja: "お名前",
    required: true,
    kind: "text" as const,
    placeholder: "お名前を入力してください。",
  },
  {
    name: "company",
    en: "Company name",
    ja: "会社 組織名",
    required: false,
    kind: "text" as const,
    placeholder: "所属する会社もしくは組織の名称を入力してください。",
  },
  {
    name: "email",
    en: "Mail Address",
    ja: "メールアドレス",
    required: true,
    kind: "email" as const,
    placeholder: "メールアドレスを入力してください。",
  },
  {
    name: "message",
    en: "Message",
    ja: "お問い合わせ内容",
    required: true,
    kind: "textarea" as const,
    placeholder: "お問い合わせ内容をご記入ください。",
  },
];

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
    <label htmlFor={htmlFor} className="flex items-baseline gap-1">
      <span className="text-[15px] tracking-[0.05em] md:text-[16px]">{en}</span>
      <span className="text-[13px]">/</span>
      <span className="text-[12px] tracking-[0.05em] text-black/60">{ja}</span>
      {required ? <span className="text-[12px] text-[#cf0000]">*</span> : null}
    </label>
  );
}

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
        <button
          type="button"
          className="mt-10 flex h-10 items-center justify-center rounded-full border border-black px-8 text-[14px] tracking-[0.05em]"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border-0 border-b border-black bg-transparent px-2 py-4 text-[13px] tracking-[0.05em] outline-none placeholder:text-black/35";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <FieldLabel
            htmlFor={field.name}
            en={field.en}
            ja={field.ja}
            required={field.required}
          />
          {field.kind === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              defaultValue=""
              className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none"><path stroke="%23000" d="M1 1.5 6 6.5 11 1.5"/></svg>')] bg-[length:12px_8px] bg-[right_8px_center] bg-no-repeat pr-8`}
            >
              <option value="" hidden>
                {field.placeholder}
              </option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : null}
          {field.kind === "text" || field.kind === "email" ? (
            <input
              id={field.name}
              name={field.name}
              type={field.kind === "email" ? "email" : "text"}
              required={field.required}
              placeholder={field.placeholder}
              className={inputClass}
            />
          ) : null}
          {field.kind === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={6}
              className={`${inputClass} min-h-[8.5rem] resize-y`}
            />
          ) : null}
        </div>
      ))}

      {status === "error" ? (
        <p className="text-[13px]">必須項目をご入力ください。</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mx-auto mt-2 flex h-10 items-center justify-center gap-2 rounded-full border border-black px-8 text-[14px] tracking-[0.05em] disabled:opacity-50"
        aria-label="Submit"
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
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
