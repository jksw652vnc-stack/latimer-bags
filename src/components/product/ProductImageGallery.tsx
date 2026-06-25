"use client";

import { useState } from "react";
import { CoverImage } from "@/components/ui/CoverImage";
import type { ShopifyImage } from "@/types/shopify";

type ProductImageGalleryProps = {
  images: ShopifyImage[];
  productTitle: string;
};

export function ProductImageGallery({
  images,
  productTitle,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  const selectedImage = images[selectedIndex];

  return (
    <div>
      <div className="image-cover-container relative aspect-[3/4] w-full bg-neutral-100">
        <CoverImage
          src={selectedImage.url}
          alt={selectedImage.altText ?? productTitle}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          objectPosition="center top"
        />
      </div>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View image ${index + 1} of ${images.length}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`image-cover-container relative aspect-[3/4] w-full bg-neutral-100 transition-opacity ${
                  selectedIndex === index
                    ? "ring-2 ring-neutral-900 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <CoverImage
                  src={image.url}
                  alt={image.altText ?? `${productTitle} thumbnail ${index + 1}`}
                  sizes="80px"
                  objectPosition="center top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
