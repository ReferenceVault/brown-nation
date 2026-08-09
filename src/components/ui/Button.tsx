import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "filled" | "outline";

type CommonProps = {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  filled:
    "bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5",
  outline:
    "border-2 border-espresso/80 text-espresso bg-transparent hover:bg-espresso hover:text-white hover:-translate-y-0.5",
};

export default function Button({ variant = "filled", icon, children, className = "", ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  );
}
