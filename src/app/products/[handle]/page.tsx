import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AddToCartForm } from "@/components/cart/AddToCartForm";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { getProductByHandle } from "@/lib/shopify/queries/products";
import { formatPrice } from "@/types/shopify";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.title} | Latimer Bags` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const images = product.images.nodes.length
    ? product.images.nodes
    : product.featuredImage
      ? [product.featuredImage]
      : [];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductImageGallery images={images} productTitle={product.title} />

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
              This week&apos;s featured bag
            </p>
            <h1 className="mb-4 font-serif text-3xl tracking-[0.06em] uppercase md:text-4xl">
              {product.title}
            </h1>
            <p className="mb-8 text-lg">
              {formatPrice(product.priceRange.minVariantPrice)}
            </p>
            <div
              className="mb-8 text-sm leading-relaxed text-neutral-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <AddToCartForm variants={product.variants.nodes} />
            <Link
              href="/#collection"
              className="mt-6 text-sm text-neutral-500 underline-offset-4 hover:underline"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
