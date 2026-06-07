const benefits = [
  { title: "Free delivery worldwide" },
  { title: "Satisfied or refunded" },
  { title: "Free returns" },
  { title: "Secure payments" },
];

function BenefitIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="mx-auto mb-4"
    >
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8V5a2 2 0 012-2h0a2 2 0 012 2v3" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function BenefitsBar() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-100 px-6 py-12">
      <ul className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="text-center">
            <BenefitIcon />
            <p className="text-[11px] tracking-[0.15em] uppercase">
              {benefit.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
