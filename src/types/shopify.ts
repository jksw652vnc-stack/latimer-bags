export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  price: Money;
};

export type ProductCard = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: Money;
  };
};

export type ProductDetail = ProductCard & {
  description: string;
  descriptionHtml: string;
  images: {
    nodes: ShopifyImage[];
  };
  variants: {
    nodes: ProductVariant[];
  };
};

export type CollectionWithProducts = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    nodes: ProductCard[];
  };
};

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}
