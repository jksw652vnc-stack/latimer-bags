import { storefrontRequest } from "../client";
import { PRODUCT_CARD_FRAGMENT } from "../fragments/product";
import type { CollectionWithProducts } from "@/types/shopify";

const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export async function getCollections(first = 10) {
  const data = await storefrontRequest<{
    collections: {
      nodes: Array<{
        id: string;
        handle: string;
        title: string;
        description: string;
        image: {
          url: string;
          altText: string | null;
          width: number;
          height: number;
        } | null;
      }>;
    };
  }>(GET_COLLECTIONS_QUERY, { first });

  return data.collections.nodes;
}

const GET_COLLECTION_BY_HANDLE_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}

  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
`;

export async function getCollectionByHandle(
  handle: string,
  first = 24,
): Promise<CollectionWithProducts | null> {
  const data = await storefrontRequest<{
    collection: CollectionWithProducts | null;
  }>(GET_COLLECTION_BY_HANDLE_QUERY, { handle, first });

  return data.collection;
}
