// Client-side cart functionality that doesn't use server-only imports
import { Cart, CartItem } from './cart';

// Get environment variables and ensure proper format
const rawDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
// Remove https:// if present and ensure .myshopify.com format
const domain = rawDomain.replace('https://', '').replace('http://', '');
const endpoint = `https://${domain}/api/2024-07/graphql.json`;
const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

console.log('Client cart config:', { domain, endpoint, hasKey: !!key });

// Validate required environment variables
if (!domain || !key) {
  console.error('Missing required Shopify environment variables:', {
    hasDomain: !!domain,
    hasKey: !!key
  });
}

interface ShopifyResponse {
  status: number;
  body: any;
}

async function clientShopifyFetch({ query, variables }: { 
  query: string; 
  variables?: any; 
}): Promise<ShopifyResponse> {
  // Check if we have required environment variables
  if (!domain || !key) {
    throw new Error('Missing Shopify environment variables. Please check NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  }

  try {
    console.log('Making request to:', endpoint);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    console.log('Shopify response:', body);

    if (body.errors) {
      throw new Error(body.errors[0]?.message ?? 'GraphQL error');
    }

    return {
      status: response.status,
      body: body.data,
    };
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

const cartFragment = `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
              }
              product {
                title
                handle
              }
              selectedOptions {
                name
                value
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<Cart> {
  const mutation = `
    mutation cartCreate {
      cartCreate {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  const response = await clientShopifyFetch({
    query: mutation,
  });

  if (response.body?.cartCreate?.userErrors?.length > 0) {
    throw new Error(response.body.cartCreate.userErrors[0].message);
  }

  return response.body.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<Cart> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  const response = await clientShopifyFetch({
    query: mutation,
    variables: {
      cartId,
      lines: [
        {
          merchandiseId,
          quantity,
        },
      ],
    },
  });

  if (response.body?.cartLinesAdd?.userErrors?.length > 0) {
    throw new Error(response.body.cartLinesAdd.userErrors[0].message);
  }

  return response.body.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart> {
  const query = `
    query cart($cartId: ID!) {
      cart(id: $cartId) {
        ...cart
      }
    }
    ${cartFragment}
  `;

  const response = await clientShopifyFetch({
    query,
    variables: { cartId },
  });

  return response.body.cart;
}

export async function updateCartItems(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  const response = await clientShopifyFetch({
    query: mutation,
    variables: {
      cartId,
      lines,
    },
  });

  if (response.body?.cartLinesUpdate?.userErrors?.length > 0) {
    throw new Error(response.body.cartLinesUpdate.userErrors[0].message);
  }

  return response.body.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
  `;

  const response = await clientShopifyFetch({
    query: mutation,
    variables: {
      cartId,
      lineIds,
    },
  });

  if (response.body?.cartLinesRemove?.userErrors?.length > 0) {
    throw new Error(response.body.cartLinesRemove.userErrors[0].message);
  }

  return response.body.cartLinesRemove.cart;
}