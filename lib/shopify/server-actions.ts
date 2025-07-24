'use server';

import { getCachedCollectionProducts, getCachedProducts, getCachedProduct, getCachedProductRecommendations } from './cache';
import { Product, Cart } from './types';
import { cookies, headers } from 'next/headers';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { fetchProductsWithCategories, AdminProduct } from './admin-api';

// Server action to fetch a single product
export async function fetchProduct(handle: string): Promise<Product | undefined> {
  try {
    const product = await getCachedProduct(handle);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}

// Server action to fetch product recommendations
export async function fetchProductRecommendations(productId: string): Promise<Product[]> {
  try {
    const products = await getCachedProductRecommendations(productId);
    return products;
  } catch (error) {
    console.error('Error fetching product recommendations:', error);
    return [];
  }
}

export async function fetchCollectionProducts(collectionHandle: string, sortKey?: string): Promise<Product[]> {
  try {
    const products = await getCachedCollectionProducts({
      collection: collectionHandle,
      sortKey: sortKey || 'BEST_SELLING'
    });
    return products;
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
}

export async function fetchProducts(params: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  try {
    const products = await getCachedProducts(params);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// New function to fetch products with categories using Admin API
export async function fetchProductsWithAdminCategories(): Promise<AdminProduct[]> {
  try {
    const products = await fetchProductsWithCategories();
    return products;
  } catch (error) {
    console.error('Error fetching products with admin categories:', error);
    return [];
  }
}

// Additional server actions needed by app pages
export async function fetchCollections() {
  const { getCachedCollections } = await import('./cache');
  try {
    const collections = await getCachedCollections();
    return [
      {
        handle: '',
        title: 'All',
        description: 'All products',
        seo: { title: 'All', description: 'All products' },
        path: '/search',
        updatedAt: new Date().toISOString()
      },
      ...collections.filter(collection => !collection.handle.startsWith('hidden'))
    ];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function fetchCollection(handle: string) {
  const { getCachedCollection } = await import('./cache');
  try {
    return await getCachedCollection(handle);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return undefined;
  }
}

export async function fetchPages() {
  try {
    // Import the necessary functions from the server-only file
    const { shopifyFetch } = await import('./fetch');
    const { getPagesQuery } = await import('./queries/page');
    
    const res = await shopifyFetch({
      query: getPagesQuery
    });

    const removeEdgesAndNodes = (array: { edges: Array<{ node: any }> }) => {
      return array.edges.map((edge) => edge?.node);
    };

    return removeEdgesAndNodes(res.body.data.pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function fetchPage(handle: string) {
  try {
    const { shopifyFetch } = await import('./fetch');
    const { getPageQuery } = await import('./queries/page');
    
    const res = await shopifyFetch({
      query: getPageQuery,
      variables: { handle }
    });

    return res.body.data.pageByHandle;
  } catch (error) {
    console.error('Error fetching page:', error);
    return undefined;
  }
}

export async function fetchMenu(handle: string) {
  try {
    const { shopifyFetch } = await import('./fetch');
    const { getMenuQuery } = await import('./queries/menu');
    
    const res = await shopifyFetch({
      query: getMenuQuery,
      variables: { handle }
    });

    return res.body.data.menu?.items || [];
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}

// Cart operations (server actions)
export async function fetchCart(): Promise<Cart | undefined> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    
    if (!cartId) {
      return undefined;
    }

    const { shopifyFetch } = await import('./fetch');
    const { getCartQuery } = await import('./queries/cart');
    
    const res = await shopifyFetch({
      query: getCartQuery,
      variables: { cartId }
    });

    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
      return undefined;
    }

    const reshapeCart = (cart: any) => {
      if (!cart) return undefined;
      
      return {
        ...cart,
        lines: cart.lines.edges.map((edge: any) => edge.node),
        totalQuantity: cart.totalQuantity || 0
      };
    };

    return reshapeCart(res.body.data.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return undefined;
  }
}

export async function createCartAction(): Promise<Cart | undefined> {
  try {
    const { shopifyFetch } = await import('./fetch');
    const { createCartMutation } = await import('./mutations/cart');
    
    const res = await shopifyFetch({
      query: createCartMutation,
      variables: {}
    });

    const reshapeCart = (cart: any) => {
      if (!cart) return undefined;
      
      return {
        ...cart,
        lines: cart.lines.edges.map((edge: any) => edge.node),
        totalQuantity: cart.totalQuantity || 0
      };
    };

    return reshapeCart(res.body.data.cartCreate.cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    return undefined;
  }
}

export async function addToCartAction(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart | undefined> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    let cart: any;

    if (cartId) {
      // Add to existing cart
      const { shopifyFetch } = await import('./fetch');
      const { addToCartMutation } = await import('./mutations/cart');
      
      const res = await shopifyFetch({
        query: addToCartMutation,
        variables: { cartId, lines }
      });
      cart = res.body.data.cartLinesAdd.cart;
    } else {
      // Create new cart
      const { shopifyFetch } = await import('./fetch');
      const { createCartMutation } = await import('./mutations/cart');
      
      const res = await shopifyFetch({
        query: createCartMutation,
        variables: { lines }
      });
      cart = res.body.data.cartCreate.cart;
      
      // Set cart ID cookie
      (await cookies()).set('cartId', cart.id);
    }

    const reshapeCart = (cart: any) => {
      if (!cart) return undefined;
      
      return {
        ...cart,
        lines: cart.lines.edges.map((edge: any) => edge.node),
        totalQuantity: cart.totalQuantity || 0
      };
    };

    return reshapeCart(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return undefined;
  }
}

export async function removeFromCartAction(lineIds: string[]): Promise<Cart | undefined> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    
    if (!cartId) {
      return undefined;
    }

    const { shopifyFetch } = await import('./fetch');
    const { removeFromCartMutation } = await import('./mutations/cart');
    
    const res = await shopifyFetch({
      query: removeFromCartMutation,
      variables: { cartId, lineIds }
    });

    const reshapeCart = (cart: any) => {
      if (!cart) return undefined;
      
      return {
        ...cart,
        lines: cart.lines.edges.map((edge: any) => edge.node),
        totalQuantity: cart.totalQuantity || 0
      };
    };

    return reshapeCart(res.body.data.cartLinesRemove.cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return undefined;
  }
}

export async function updateCartAction(lines: Array<{ id: string; quantity: number }>): Promise<Cart | undefined> {
  try {
    const cartId = (await cookies()).get('cartId')?.value;
    
    if (!cartId) {
      return undefined;
    }

    const { shopifyFetch } = await import('./fetch');
    const { editCartItemsMutation } = await import('./mutations/cart');
    
    const res = await shopifyFetch({
      query: editCartItemsMutation,
      variables: { cartId, lines }
    });

    const reshapeCart = (cart: any) => {
      if (!cart) return undefined;
      
      return {
        ...cart,
        lines: cart.lines.edges.map((edge: any) => edge.node),
        totalQuantity: cart.totalQuantity || 0
      };
    };

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return undefined;
  }
}

// Revalidation server action (from app/api/revalidate/route.ts)
export async function revalidateAction(req: NextRequest): Promise<NextResponse> {
  try {
    // We always need to respond with a 200 status code to Shopify,
    // otherwise it will continue to retry the request.
    const collectionWebhooks = [
      'collections/create',
      'collections/delete',
      'collections/update'
    ];
    const productWebhooks = [
      'products/create',
      'products/delete',
      'products/update'
    ];
    const topic = (await headers()).get('x-shopify-topic') || 'unknown';
    const secret = req.nextUrl.searchParams.get('secret');
    const isCollectionUpdate = collectionWebhooks.includes(topic);
    const isProductUpdate = productWebhooks.includes(topic);

    if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
      console.error('Invalid revalidation secret.');
      return NextResponse.json({ status: 200 });
    }

    if (!isCollectionUpdate && !isProductUpdate) {
      // We don't need to revalidate anything for any other topics.
      return NextResponse.json({ status: 200 });
    }

    if (isCollectionUpdate) {
      revalidateTag(TAGS.collections);
    }

    if (isProductUpdate) {
      revalidateTag(TAGS.products);
    }

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Error in revalidation:', error);
    return NextResponse.json({ status: 200 });
  }
}