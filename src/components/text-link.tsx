import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({ href, children, className = "", external }: Props) {
  const classes = `ff-en text-link ${className}`.trim();

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
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
