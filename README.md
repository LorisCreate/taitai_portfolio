# ATELIER 516

PHOTO 516 のヘッダー構成と、walnut. のトップページ構成を参考にしたクリエイターサイトです。旅日記セクションは入れていません。

## 開発

```bash
npm install
npm run dev
```

ブラウザで http://localhost:43123 を開きます。ポートは `package.json` の `dev` スクリプトで指定しています。

## お問い合わせフォーム

Contact の送信先は `taitaisubad@gmail.com` です。送信には [Resend](https://resend.com) を使います。キーが無いときは Thank you を出さず、画面に失敗を表示します。

プロジェクト直下に `.env.local` を置き、次を設定してから `npm run dev` を再起動してください。

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
```

- `RESEND_API_KEY` … Resend の API キー（値は `.env.local` のみ。Git に入れない）
- `RESEND_FROM_EMAIL` … 送信元。Resend 公式サンプルのテスト用 From は `onboarding@resend.dev`。本番用ドメインは認証後に差し替える

受信アドレスはコード側で固定しています。`.env.example` にも同じ変数名を書いてあります。

## ページ

- `/` トップ（ヒーロー、what's new、about、design、photograph、works、instagram、contact）
- `/gallery` 作品ギャラリー（`public/image_card` のサムネと `public/original` / `public/funart` の jpg をファイル名で対応）
- `/profile` プロフィール
- `/event` イベント・お知らせ
- `/contact` お問い合わせ

## Gallery 画像

`src/lib/site.ts` には作品パスを書きません。サーバーが次のフォルダを読みます。

- `public/image_card/` … グリッドのサムネ
- `public/original/` … タグ「オリジナル」の原寸
- `public/funart/` … タグ「二次創作」の原寸

同じファイル名（拡張子以外）でサムネと原寸を結びます。例: `image_card/foo.jpg` と `original/foo.jpg`。フォルダに jpg を足せば Gallery に出ます。このリポジトリのクローン側に画像がある場合は、その `public/` をコミットして push してください。

作品詳細（`/gallery/[slug]`）は非公開です。グリッドの拡大オーバーレイのみ出します。再び公開するときは `src/lib/site.ts` の `showGalleryDetailPages` を `true` にしてください。

トップ「わたしのこと」は `public/about/aboutPortrait01.jpg`、Profile は `public/about/aboutPortrait02.jpg` です。画像本体はこのリポジトリに含めず、ローカルの `public/about/` に置いてください。

トップの漫画ブロックは `public/manga/` の jpg / png / webp をファイル名順で全部出します。WSL 側にファイルがある場合は `git pull` のうえ、その `public/manga/` をコミットしてください。
