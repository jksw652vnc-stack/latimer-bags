import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { shopifyConfig } from "./config";

let client: ReturnType<typeof createStorefrontApiClient> | null = null;

export function getStorefrontClient() {
  if (!client) {
    client = createStorefrontApiClient({
      storeDomain: `https://${shopifyConfig.storeDomain}`,
      apiVersion: shopifyConfig.apiVersion,
      publicAccessToken: shopifyConfig.storefrontAccessToken,
    });
  }

  return client;
}

export async function storefrontRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { data, errors } = await getStorefrontClient().request<T>(query, {
    variables,
  });

  if (errors) {
    const message =
      typeof errors === "object" && errors !== null && "message" in errors
        ? String(errors.message)
        : JSON.stringify(errors);
    throw new Error(`Shopify Storefront API error: ${message}`);
  }

  if (!data) {
    throw new Error("Shopify Storefront API returned no data");
  }

  return data;
}
