import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ImageWithText } from "@/components/home/ImageWithText";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { BenefitsBar } from "@/components/home/BenefitsBar";
import { getCollectionByHandle } from "@/lib/shopify/queries/collections";
import { getProducts } from "@/lib/shopify/queries/products";
import type { ProductCard } from "@/types/shopify";

export const revalidate = 60;

function findProduct(products: ProductCard[], handle: string) {
  return products.find((p) => p.handle === handle);
}

export default async function HomePage() {
  const [collection, allProducts] = await Promise.all([
    getCollectionByHandle("layla-maria-stella", 12),
    getProducts(12),
  ]);

  const products = collection?.products.nodes.length
    ? collection.products.nodes
    : allProducts;

  const storyProduct =
    findProduct(allProducts, "handmade-red-leather-crossbody-bag") ??
    allProducts[2];
  const laylaProduct =
    findProduct(allProducts, "the-layla-bag-burgundy") ?? allProducts[4];

  const storyImage = storyProduct?.featuredImage;
  const laylaImage = laylaProduct?.featuredImage;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        <HeroSection />

        {storyImage && (
          <ImageWithText
            id="story"
            imageUrl={storyImage.url}
            imageAlt={storyImage.altText ?? "Our story"}
            imagePosition="left"
            subheading="Our Story"
            heading="Luxury leather, honestly priced"
            description="Latimer Bags was born from a simple frustration: luxury leather bags shouldn't cost £800. Using the same premium cowhide and hand-finishing techniques as the big names, we produce in small batches to keep quality exceptional and prices honest. Every bag carries the Latimer name because we stand behind every stitch."
            dark
          />
        )}

        {laylaImage && (
          <ImageWithText
            imageUrl={laylaImage.url}
            imageAlt={laylaImage.altText ?? "The Layla bag"}
            imagePosition="right"
            subheading="New In"
            heading="Meet The Layla"
            description="Our elongated shoulder bag crafted from cowhide leather. Effortlessly elegant, compact and versatile — the perfect everyday luxury."
            primaryButton={{
              label: "Shop The Layla",
              href: `/products/${laylaProduct?.handle ?? "the-layla-bag-burgundy"}`,
            }}
            secondaryButton={{
              label: "Follow Us @latimerbags",
              href: "https://instagram.com/latimerbags",
            }}
            imageObjectPosition="center 40%"
          />
        )}

        <Testimonials />
        <ProductGrid products={products} />
        <Newsletter />
        <BenefitsBar />
      </main>

      <Footer />
    </>
  );
}
