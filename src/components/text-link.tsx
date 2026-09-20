import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  en?: boolean;
};

export function TextLink({
  href,
  children,
  className = "",
  external,
  en = true,
}: Props) {
  const classes = `${en ? "ff-en " : ""}text-link ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text-link__label">{children}</span>
        <span className="text-link__arrow" aria-hidden="true">
          <span className="text-link__shaft" />
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span className="text-link__label">{children}</span>
      <span className="text-link__arrow" aria-hidden="true">
        <span className="text-link__shaft" />
      </span>
    </Link>
  );
}
