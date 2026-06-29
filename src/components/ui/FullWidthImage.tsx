import Image from "next/image";

type FullWidthImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function FullWidthImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "100vw",
  className = "",
}: FullWidthImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-full ${className}`}
    />
  );
}
