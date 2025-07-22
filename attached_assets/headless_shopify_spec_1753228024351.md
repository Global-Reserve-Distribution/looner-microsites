# Olipop-Inspired Headless Shopify Product Page

## Overview

This document outlines the developer specification for building a reusable, scalable product page inspired by Olipop's design (e.g. [https://drinkolipop.com/products/watermelon-lime](https://drinkolipop.com/products/watermelon-lime)), using **Next.js** with a **Shopify Storefront API** headless integration.

## Tech Stack

- **Frontend**: Next.js (Pages or App Router)
- **Styling**: Tailwind CSS (preferred)
- **State Management**: React Context or Zustand (for cart and flavor selection)
- **Backend/CMS**: Shopify Storefront API (GraphQL)
- **Deployment**: Vercel or Replit

---

## Reusable Components

### 1. `FlavorSelectorGrid`

**Purpose**: Grid-style flavor selector that fetches sibling products from a Shopify collection and allows navigation between product pages.

**GraphQL Query**:

```graphql
query {
  collection(handle: "your-collection") {
    products(first: 12) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
}
```

**Props**:

```ts
{
  activeHandle: string;
  onSelect: (handle: string) => void;
}
```

### 2. `StickyProductInfoPanel`

**Purpose**: Fixed panel with key product data, pricing, variant selector, quantity input, add to cart, subscription toggle, and store finder.

**Data**: Shopify `productByHandle` query with variants and metafields.

### 3. `IconFeatureList`

**Purpose**: Icons for product features (e.g., High Fiber, Non-GMO). Data pulled from Shopify metafields or tags.

**Metafield Namespace**:

```graphql
metafields(namespace: "features", first: 10)
```

### 4. `NutritionFactsCard`

**Purpose**: Consistent layout of nutrition facts. Data pulled from Shopify metafields or rich text fields.

**Metafield Namespace**:

```graphql
metafields(namespace: "nutrition", first: 10)
```

### 5. `ReviewList`

**Purpose**: Displays customer reviews. Initially static or mock data. Later integrated with Stamped.io, Yotpo, or Shopify Reviews.

### 6. `ProductCarousel`

**Purpose**: Related products slider ("You May Also Like").

**GraphQL Query**:

```graphql
query {
  productRecommendations(productId: "gid://shopify/Product/1234") {
    id
    title
    handle
    images(first: 1) { ... }
  }
}
```

---

## Page Layout: `/products/[handle]`

| Section              | Component                               |
| -------------------- | --------------------------------------- |
| Hero & Product Info  | `ProductHero`, `StickyProductInfoPanel` |
| Flavor Selector Grid | `FlavorSelectorGrid`                    |
| Image Row / CTA      | `ContentImageBlock`                     |
| Nutrition Section    | `NutritionFactsCard`, `IconFeatureList` |
| Reviews              | `ReviewList`                            |
| Related Products     | `ProductCarousel`                       |
| Footer               | `GlobalFooter`                          |

---

## Cart & Checkout Flow

- **Add to Cart**: Uses global cart context with Shopify variant IDs
- **Checkout**: Use Storefront API `checkoutCreate` mutation:

```graphql
mutation {
  checkoutCreate(input: {
    lineItems: [
      {
        variantId: "gid://shopify/ProductVariant/...",
        quantity: 1
      }
    ]
  }) {
    checkout {
      id
      webUrl
    }
  }
}
```

User is redirected to `checkout.webUrl`

---

## File Structure

```txt
/components
  /Product
    FlavorSelectorGrid.tsx
    StickyProductInfoPanel.tsx
    NutritionFactsCard.tsx
    ReviewList.tsx
  /shared
    IconFeatureList.tsx
    ProductCarousel.tsx
    Button.tsx
/pages
  /products/[handle].tsx
/lib
  shopify.ts         // GraphQL client
  queries.ts         // Storefront queries
/context
  CartContext.tsx
```

---

## Notes

- All data is dynamic via Shopify Storefront API
- Metafields are key to feature toggles (icons, nutrition, etc.)
- Flavor selector is a core reusable component tied to Shopify product handles
- No hardcoded product JSON used at any stage

