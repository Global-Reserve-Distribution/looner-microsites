'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface AddToCartButtonProps {
  merchandiseId: string;
  quantity?: number;
  productTitle?: string;
  productPrice?: string;
  variant?: 'primary' | 'sticky' | 'compact';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  merchandiseId,
  quantity = 1,
  productTitle,
  productPrice,
  variant = 'primary',
  disabled = false,
  className = '',
  children
}: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding || isLoading) return;
    
    // Validate merchandiseId before attempting to add to cart
    if (!merchandiseId || merchandiseId.trim() === '') {
      console.error('Cannot add to cart: merchandiseId is empty or invalid');
      return;
    }
    
    setIsAdding(true);
    try {
      const success = await addToCart(merchandiseId, quantity);
      if (success) {
        console.log(`Added ${productTitle || 'product'} to cart`);
        // TODO: Show success toast notification
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // TODO: Show error toast notification
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} w-full bg-green-800 text-white px-6 rounded-full text-lg hover:bg-green-900 shadow-lg ${className}`;
      case 'sticky':
        return `${baseClasses} bg-green-800 text-white py-3 px-6 rounded-full text-base hover:bg-green-900 shadow-md ${className}`;
      case 'compact':
        return `${baseClasses} bg-green-800 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-900 ${className}`;
      default:
        return `${baseClasses} ${className}`;
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case 'primary':
        return 24;
      case 'sticky':
        return 20;
      case 'compact':
        return 16;
      default:
        return 20;
    }
  };

  const buttonText = isAdding ? 'Adding...' : children || 'Add to Cart';
  const iconSize = getIconSize();

  // Show disabled state if merchandiseId is invalid
  const isInvalidMerchandiseId = !merchandiseId || merchandiseId.trim() === '';
  const isButtonDisabled = disabled || isAdding || isLoading || isInvalidMerchandiseId;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isButtonDisabled}
      className={getButtonClasses()}
      aria-label={`Add ${productTitle || 'product'} to cart`}
    >
      {variant === 'sticky' ? (
        <>
          <Plus size={iconSize} className="mr-2" />
          {buttonText}
        </>
      ) : (
        <>
          <ShoppingCart size={iconSize} className="mr-2" />
          {buttonText}
        </>
      )}
    </button>
  );
}