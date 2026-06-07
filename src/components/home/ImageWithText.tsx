import Image from "next/image";
import { Button } from "@/components/ui/Button";

type ImageWithTextProps = {
  id?: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  subheading?: string;
  heading: string;
  description: string;
  primaryButton?: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
  dark?: boolean;
};

export function ImageWithText({
  id,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  subheading,
  heading,
  description,
  primaryButton,
  secondaryButton,
  dark = false,
}: ImageWithTextProps) {
  const imageBlock = (
    <div className="relative aspect-[4/5] min-h-[400px] md:aspect-auto md:min-h-[560px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const textBlock = (
    <div
      className={`flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20 ${
        dark ? "bg-black text-white" : "bg-neutral-100 text-neutral-900"
      }`}
    >
      {subheading && (
        <p className="mb-4 text-[11px] tracking-[0.25em] uppercase opacity-70">
          {subheading}
        </p>
      )}
      <h2 className="mb-6 font-serif text-3xl tracking-[0.06em] uppercase md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      <p className="max-w-md text-sm leading-relaxed opacity-80 md:text-base">
        {description}
      </p>
      {(primaryButton || secondaryButton) && (
        <div className="mt-8 flex flex-wrap gap-4">
          {primaryButton && (
            <Button href={primaryButton.href} variant="secondary">
              {primaryButton.label}
            </Button>
          )}
          {secondaryButton && (
            <Button
              href={secondaryButton.href}
              variant={dark ? "outline" : "secondary"}
              className={dark ? "" : "bg-transparent border border-black text-black hover:bg-black hover:text-white"}
            >
              {secondaryButton.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id={id} className="grid md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}
