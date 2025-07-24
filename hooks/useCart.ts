'use client';

import { useState, useEffect } from 'react';
import { Cart } from '../lib/shopify/cart';
import { createCart, addToCart, getCart } from '../lib/shopify/client-cart';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      // Only run in browser environment
      if (typeof window === 'undefined') return;
      
      try {
        // Check for existing cart ID in localStorage
        const existingCartId = localStorage.getItem('shopify-cart-id');
        
        if (existingCartId) {
          try {
            const existingCart = await getCart(existingCartId);
            setCart(existingCart);
            return;
          } catch (error) {
            // Cart might be expired, create a new one
            console.log('Existing cart not found, creating new one');
            localStorage.removeItem('shopify-cart-id');
          }
        }
        
        // Create new cart if none exists or existing one is invalid
        const newCart = await createCart();
        setCart(newCart);
        localStorage.setItem('shopify-cart-id', newCart.id);
      } catch (err) {
        console.error('Failed to initialize cart:', err);
        setError(err instanceof Error ? err.message : 'Cart temporarily unavailable');
        // Don't fail completely - let the app continue without cart
        setCart(null);
      }
    };

    initializeCart();
  }, []);

  const addToCartHandler = async (merchandiseId: string, quantity: number = 1) => {
    if (!cart) {
      setError('Cart not initialized');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await addToCart(cart.id, merchandiseId, quantity);
      setCart(updatedCart);
      return true;
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    if (!cart?.id) return;

    try {
      const refreshedCart = await getCart(cart.id);
      setCart(refreshedCart);
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  return {
    cart,
    isLoading,
    error,
    addToCart: addToCartHandler,
    refreshCart,
  };
}