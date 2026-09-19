import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const CONTACT_TO = site.contactTo;

type ContactBody = {
  type?: unknown;
  name?: unknown;
  company?: unknown;
  email?: unknown;
  message?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    const missing = [
      !apiKey ? "RESEND_API_KEY" : null,
      !from ? "RESEND_FROM_EMAIL" : null,
    ].filter(Boolean);

    return NextResponse.json(
      {
        error: `メール送信の設定がありません（${missing.join(" / ")}）。.env.local に値を入れてサーバーを再起動してください。`,
      },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "送信データが読み取れませんでした。" }, { status: 400 });
  }

  const type = asText(body.type);
  const name = asText(body.name);
  const company = asText(body.company);
  const email = asText(body.email);
  const message = asText(body.message);

  if (!type || !name || !email || !message) {
    return NextResponse.json({ error: "必須項目をご入力ください。" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "メールアドレスの形式をご確認ください。" }, { status: 400 });
  }

  const text = [
    "ポートフォリオサイトからお問い合わせがありました。",
    "",
    `種別: ${type}`,
    `お名前: ${name}`,
    `会社 / 組織名: ${company || "（未入力）"}`,
    `メールアドレス: ${email}`,
    "",
    "お問い合わせ内容:",
    message,
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: CONTACT_TO,
    replyTo: email,
    subject: `【お問い合わせ】${type} / ${name}`,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: `メール送信に失敗しました。${error.message}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
