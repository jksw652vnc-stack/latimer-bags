import { storefrontRequest } from "../client";
import { PRODUCT_CARD_FRAGMENT } from "../fragments/product";
import type { ProductCard, ProductDetail } from "@/types/shopify";

const GET_PRODUCTS_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}

  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export async function getProducts(first = 12): Promise<ProductCard[]> {
  const data = await storefrontRequest<{
    products: { nodes: ProductCard[] };
  }>(GET_PRODUCTS_QUERY, { first });

  return data.products.nodes;
}

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string) {
  const data = await storefrontRequest<{
    product: ProductDetail | null;
  }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.product;
}
