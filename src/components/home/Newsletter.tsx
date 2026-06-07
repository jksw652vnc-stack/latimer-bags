export function Newsletter() {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[11px] tracking-[0.25em] uppercase opacity-70">
          Keep me updated
        </p>
        <h2 className="mb-6 font-serif text-3xl tracking-[0.08em] uppercase md:text-4xl">
          Newsletter
        </h2>
        <p className="mb-10 text-sm leading-relaxed opacity-70">
          New collections, exclusive offers, and styling inspiration — delivered
          to your inbox.
        </p>
        <form className="flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="E-mail"
            className="flex-1 border border-neutral-700 bg-neutral-900 px-4 py-3.5 text-sm outline-none placeholder:text-neutral-500 focus:border-white"
          />
          <button
            type="submit"
            className="bg-white px-8 py-3.5 text-[11px] tracking-[0.2em] text-black uppercase transition-opacity hover:opacity-80"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
