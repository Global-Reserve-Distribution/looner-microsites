'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Cart } from '../lib/shopify/cart';

interface StickyCartFooterProps {
  cart: Cart | null;
  isMainButtonVisible: boolean;
  onAddToCart: () => void;
  productTitle: string;
  productPrice: string;
  productImage?: string;
}

export function StickyCartFooter({ 
  cart, 
  isMainButtonVisible, 
  onAddToCart, 
  productTitle, 
  productPrice,
  productImage 
}: StickyCartFooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show sticky footer only on mobile when main button is not visible
    const updateVisibility = () => {
      const isMobile = window.innerWidth < 768;
      setIsVisible(isMobile && !isMainButtonVisible);
    };

    updateVisibility();
    window.addEventListener('resize', updateVisibility);
    
    return () => window.removeEventListener('resize', updateVisibility);
  }, [isMainButtonVisible]);

  if (!isVisible) return null;

  const totalQuantity = cart?.totalQuantity || 0;
  const hasItems = totalQuantity > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 md:hidden">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Product Preview */}
        <div className="flex items-center space-x-3 flex-1">
          {productImage ? (
            <img 
              src={productImage} 
              alt={productTitle}
              className="w-12 h-12 object-contain rounded-lg bg-gray-100"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-b from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">LOONER</span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {productTitle}
            </h4>
            <p className="text-xs text-gray-500">
              {hasItems ? `${totalQuantity} in cart` : 'One time purchase'}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">
              {productPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        className="w-full mt-3 bg-green-800 hover:bg-green-900 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>
          {hasItems ? 'Add Another' : 'Add to Cart'}
        </span>
      </button>

      {/* Cart Total (if items exist) */}
      {hasItems && cart && (
        <div className="mt-2 text-center">
          <button 
            onClick={() => window.open(cart.checkoutUrl, '_blank')}
            className="text-sm text-green-700 hover:text-green-800 font-medium"
          >
            View Cart • ${parseFloat(cart.cost.totalAmount.amount).toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}