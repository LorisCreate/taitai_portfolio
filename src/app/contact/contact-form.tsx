"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
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
      <div className="border border-black px-6 py-12 text-center">
        <p className="ff-en tracking-[0.16em]">thank you</p>
        <p className="mt-4">
          お問い合わせを受け付けました。内容を確認のうえ、ご連絡いたします。
        </p>
        <button
          type="button"
          className="ff-en mt-8 text-[13px] tracking-[0.16em] underline"
          onClick={() => setStatus("idle")}
        >
          send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <label className="block">
        <span className="ff-en text-[12px] tracking-[0.16em]">name</span>
        <input
          name="name"
          required
          className="mt-2 w-full border-0 border-b border-black bg-transparent py-2 outline-none"
        />
      </label>
      <label className="block">
        <span className="ff-en text-[12px] tracking-[0.16em]">email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full border-0 border-b border-black bg-transparent py-2 outline-none"
        />
      </label>
      <label className="block">
        <span className="ff-en text-[12px] tracking-[0.16em]">message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y border-0 border-b border-black bg-transparent py-2 outline-none"
        />
      </label>
      {status === "error" ? (
        <p className="text-[13px]">必須項目をご入力ください。</p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="ff-en border border-black px-10 py-3 text-[13px] tracking-[0.2em] disabled:opacity-50"
      >
        {status === "sending" ? "sending..." : "send"}
      </button>
    </form>
  );
}
