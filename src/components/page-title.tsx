type Props = {
  en: string;
  ja: string;
};

export function PageTitle({ en, ja }: Props) {
  return (
    <header className="page-title">
      <h1 className="page-title__ttl">
        <span className="page-title__en ff-en">{en}</span>
        <span className="page-title__ja">{ja}</span>
      </h1>
    </header>
  );
}
