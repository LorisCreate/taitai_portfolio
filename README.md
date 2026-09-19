# ATELIER 516

PHOTO 516 のヘッダー構成と、walnut. のトップページ構成を参考にしたクリエイターサイトです。旅日記セクションは入れていません。

## 開発

```bash
npm install
npm run dev
```

ブラウザで http://localhost:43123 を開きます。ポートは `package.json` の `dev` スクリプトで指定しています。

## お問い合わせフォーム

Contact の送信先は `taitai.0221@taichaduke.com` です。送信には [Resend](https://resend.com) を使います。キーが無いときは Thank you を出さず、画面に失敗を表示します。

プロジェクト直下に `.env.local` を置き、次を設定してから `npm run dev` を再起動してください。

```bash
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL="たいたい <noreply@your-verified-domain.com>"
```

- `RESEND_API_KEY` … Resend の API キー
- `RESEND_FROM_EMAIL` … Resend で認証した送信元（From）。未認証のアドレスでは Resend 側で送れません

受信アドレスはコード側で固定しています。`.env.example` にも同じ変数名を書いてあります。

## ページ

- `/` トップ（ヒーロー、what's new、about、design、photograph、works、instagram、contact）
- `/gallery` 作品ギャラリー
- `/profile` プロフィール
- `/event` イベント・お知らせ
- `/contact` お問い合わせ
