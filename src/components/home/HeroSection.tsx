import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { Button } from "@/components/ui/Button";

const HERO_IMAGE = "/images/hero.jpg";
const HERO_IMAGE_ALT = "Latimer luxury leather bag";
const HERO_IMAGE_WIDTH = 3287;
const HERO_IMAGE_HEIGHT = 3803;

export function HeroSection() {
  return (
    <section className="relative w-full">
      <FullWidthImage
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        width={HERO_IMAGE_WIDTH}
        height={HERO_IMAGE_HEIGHT}
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
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
