function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const shopifyConfig = {
  storeDomain: requireEnv("SHOPIFY_STORE_DOMAIN"),
  storefrontAccessToken: requireEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2026-01",
} as const;

export function getStorefrontApiUrl(): string {
  return `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`;
}
