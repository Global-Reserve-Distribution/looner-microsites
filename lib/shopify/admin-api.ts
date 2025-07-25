const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;
const key = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyAdminFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      query
    };
  }
}

// GraphQL query to get products with categories from Admin API
export const getProductsWithCategoriesQuery = /* GraphQL */ `
  query getProductsWithCategories($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          vendor
          tags
          category {
            id
            name
          }
          featuredImage {
            url
            altText
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                price
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(identifiers: [
            {namespace: "custom", key: "primary_color"},
            {namespace: "custom", key: "secondary_color"},
            {namespace: "custom", key: "display_name"},
            {namespace: "custom", key: "short_description"}
          ]) {
            key
            value
            type
            namespace
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  category?: {
    id: string;
    name: string;
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: string;
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  metafields: Array<{
    key: string;
    value: string;
    type: string;
    namespace: string;
  }>;
}

export async function fetchProductsWithCategories(): Promise<AdminProduct[]> {
  const products: AdminProduct[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const response: any = await shopifyAdminFetch<{
        data: {
          products: {
            edges: Array<{ node: AdminProduct }>;
            pageInfo: {
              hasNextPage: boolean;
              endCursor: string;
            };
          };
        };
      }>({
        query: getProductsWithCategoriesQuery,
        variables: {
          first: 50,
          after: after
        } as any,
        cache: 'no-store', // Always fetch fresh data for admin
      });

      const data: any = response.body.data;
      
      if (data?.products?.edges) {
        products.push(...data.products.edges.map((edge: any) => edge.node));
      }

      hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
      after = data?.products?.pageInfo?.endCursor || null;
    } catch (error) {
      console.error('Error fetching products with categories:', error);
      break;
    }
  }

  return products;
}