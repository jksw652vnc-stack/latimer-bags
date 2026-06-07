# Latimer Bags

Custom headless storefront for [Latimer Bags](https://fyfcz8-t6.myshopify.com), built with Next.js and the Shopify Storefront API.

## Project structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # UI components (header, product cards, etc.)
├── lib/
│   └── shopify/
│       ├── client.ts       # Storefront API client + request helper
│       ├── config.ts       # Env-based Shopify configuration
│       ├── fragments/      # Reusable GraphQL fragments
│       └── queries/        # Product & collection queries
└── types/
    └── shopify.ts          # Shared Shopify types & helpers
```

## Setup

### 1. Get your Storefront API access token

You need a **Storefront API access token** (not the Admin API token).

1. Open [Shopify Admin](https://admin.shopify.com/store/fyfcz8-t6) for your store.
2. Go to **Settings → Apps and sales channels**.
3. Click **Develop apps**. If prompted, allow custom app development.
4. Click **Create an app** and name it (e.g. `Latimer Headless Storefront`).
5. Open the app → **Configuration** tab.
6. Under **Storefront API integration**, click **Configure**.
7. Enable these scopes (minimum for a product storefront):
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts` (for cart/checkout later)
   - `unauthenticated_read_checkouts`
8. Click **Save**, then **Install app**.
9. Go to the **API credentials** tab.
10. Copy the **Storefront API access token** (starts with a public token string).

Also confirm products are published to the **Online Store** sales channel — the Storefront API only returns products available on that channel.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=fyfcz8-t6.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
SHOPIFY_API_VERSION=2025-01
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the token is valid, you should see your Shopify products.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run start`   | Run production server    |
| `npm run typecheck` | TypeScript check       |
