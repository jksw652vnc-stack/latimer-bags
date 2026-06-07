import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants = {
  primary: "bg-white text-black hover:bg-neutral-100",
  secondary: "bg-black text-white hover:bg-neutral-800",
  outline: "border border-white text-white hover:bg-white hover:text-black",
};

export function Button({
  href,
  children,
  variant = "secondary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
