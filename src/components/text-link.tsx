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
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
