import { CoverImage } from "@/components/ui/CoverImage";
import { Button } from "@/components/ui/Button";

const HERO_IMAGE = "/images/hero.jpg";
const HERO_IMAGE_ALT = "Latimer luxury leather bag";

export function HeroSection() {
  return (
    <section className="image-cover-container relative aspect-[4/5] w-full sm:aspect-[5/6] md:aspect-[3/4] lg:aspect-[4/3] xl:aspect-auto xl:min-h-[90svh]">
      <CoverImage
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        priority
        sizes="100vw"
        objectPosition="center 28%"
      />
      <div className="absolute inset-0 z-10 bg-black/20" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="max-w-3xl font-serif text-3xl leading-tight tracking-[0.08em] uppercase md:text-5xl lg:text-6xl">
          Luxury Leather.
          <br />
          Thoughtfully Priced
        </h1>
        <div className="mt-10">
          <Button href="#collection" variant="primary">
            Shop the Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
