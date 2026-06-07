import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About | Latimer Bags",
  description:
    "Learn about Latimer Bags — premium full-grain cowhide leather, handcrafted in small batches.",
};

const values = [
  {
    title: "Authentic Craftsmanship",
    description:
      "Every bag is handcrafted using ethically sourced cowhide leather.",
  },
  {
    title: "Timeless Style",
    description:
      "Designs that outlast trends, pieces you'll reach for year after year.",
  },
  {
    title: "Everyday Luxury",
    description: "Soft to the touch, built to last, made for real life.",
  },
  {
    title: "Small Batches",
    description:
      "We produce in limited quantities to minimise waste and maintain exceptional quality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <h1 className="mb-10 font-serif text-4xl tracking-[0.04em] text-neutral-900 md:text-5xl">
            About Latimer Bags
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            <p>
              Our journey began with a simple belief: luxury should be felt,
              seen, and lived — every day.
            </p>
            <p>
              Crafted from premium full-grain cowhide leather, our bags are
              designed to age beautifully and accompany you through life&apos;s
              moments. Inspired by real women, real style, and real life.
            </p>
            <p>
              Each piece is made in limited quantities to preserve its
              uniqueness and ensure the highest quality.
            </p>
          </div>

          <section className="mt-16 md:mt-20">
            <h2 className="mb-8 text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
              What we stand for
            </h2>

            <ul className="space-y-6">
              {values.map((value) => (
                <li
                  key={value.title}
                  className="flex gap-4 text-base leading-relaxed text-neutral-600 md:text-lg"
                >
                  <span className="mt-1 shrink-0 text-neutral-400" aria-hidden>
                    →
                  </span>
                  <p>
                    <span className="font-medium text-neutral-900">
                      {value.title}
                    </span>
                    {" — "}
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 border-t border-neutral-200 pt-10">
            <Link
              href="/#collection"
              className="inline-block bg-black px-8 py-3.5 text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-80"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
