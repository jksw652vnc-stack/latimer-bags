import Image from "next/image";
import Link from "next/link";
import type { ProductCard } from "@/types/shopify";
import { formatPrice } from "@/types/shopify";

type ProductGridProps = {
  products: ProductCard[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="collection" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
            The Collection
          </p>
          <h2 className="font-serif text-3xl tracking-[0.08em] uppercase md:text-4xl">
            Shop Our Bags
          </h2>
        </div>

        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.handle}`} className="group block">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-neutral-100">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText ?? product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="text-[11px] tracking-[0.12em] uppercase">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
