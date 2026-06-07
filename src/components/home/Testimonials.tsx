function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-[11px] tracking-[0.25em] uppercase opacity-70">
          Loved by our customers
        </p>
        <div className="mb-8 flex justify-center gap-1 text-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <blockquote className="font-serif text-2xl leading-relaxed tracking-wide md:text-3xl">
          &ldquo;Beautifully made. The quality feels far more expensive than the
          price — you can tell it will last.&rdquo;
        </blockquote>
        <p className="mt-8 text-sm tracking-wide opacity-70">
          Amanda, Verified Buyer
        </p>
      </div>
    </section>
  );
}
