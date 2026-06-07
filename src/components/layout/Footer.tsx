import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-[11px] tracking-[0.2em] uppercase">
            Be the first to know
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-neutral-600">
            Subscribe for new collections, exclusive offers, and styling inspiration.
          </p>
          <form className="flex border-b border-neutral-900">
            <input
              type="email"
              placeholder="E-mail"
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] tracking-[0.2em] uppercase">Footer menu</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link href="/about" className="transition-opacity hover:opacity-60">
                About
              </Link>
            </li>
            <li>
              <Link href="/#collection" className="transition-opacity hover:opacity-60">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] tracking-[0.2em] uppercase">About</h3>
          <p className="text-sm leading-relaxed text-neutral-600">
            Latimer Bags was born from a simple frustration: luxury leather bags
            shouldn&apos;t cost £800. Using the same premium cowhide and
            hand-finishing techniques as the big names, we produce in small
            batches to keep quality exceptional and prices honest.
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Latimer Bags
      </div>
    </footer>
  );
}
