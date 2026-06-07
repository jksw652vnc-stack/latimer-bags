import Image from "next/image";

type CoverImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectPosition?: string;
};

export function CoverImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  objectPosition = "center center",
}: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectFit: "cover", objectPosition }}
    />
  );
}
