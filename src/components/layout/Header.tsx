import Link from "next/link";

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 7h12l1 14H5L6 7z" />
      <path d="M9 7V5a3 3 0 016 0v2" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#collection", label: "Shop" },
  { href: "#story", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[72px]">
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-xl tracking-[0.35em] uppercase lg:text-2xl"
        >
          Latimer
        </Link>

        <div className="ml-auto flex items-center gap-5">
          <button type="button" aria-label="Account" className="transition-opacity hover:opacity-60">
            <IconUser />
          </button>
          <button type="button" aria-label="Search" className="transition-opacity hover:opacity-60">
            <IconSearch />
          </button>
          <button type="button" aria-label="Cart" className="transition-opacity hover:opacity-60">
            <IconBag />
          </button>
        </div>
      </div>
    </header>
  );
}
