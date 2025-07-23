'use client';

import { useState } from 'react';
import type { Product } from '../../lib/shopify/types';

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [purchaseOption, setPurchaseOption] = useState<'one-time' | 'subscription'>('one-time');
  const [quantity, setQuantity] = useState(1);

  const basePrice = parseFloat(product.priceRange.minVariantPrice.amount) || 35.99;
  const subscriptionPrice = basePrice * 0.85; // 15% discount for subscription
  const packSize = '12 cans';

  return (
    <div className="space-y-6">
      {/* Purchase Options */}
      <div className="space-y-4">
        {/* One-Time Purchase */}
        <label className={`
          block p-4 rounded-xl border-2 cursor-pointer transition-all
          ${purchaseOption === 'one-time' 
            ? 'border-cannabis-500 bg-cannabis-50' 
            : 'border-gray-200 hover:border-cannabis-300'
          }
        `}>
          <input 
            type="radio"
            name="purchase-option"
            value="one-time"
            checked={purchaseOption === 'one-time'}
            onChange={(e) => setPurchaseOption(e.target.value as 'one-time')}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${purchaseOption === 'one-time' ? 'border-cannabis-500' : 'border-gray-300'}
              `}>
                {purchaseOption === 'one-time' && (
                  <div className="w-3 h-3 rounded-full bg-cannabis-500"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800">One-Time Purchase</div>
                <div className="text-sm text-gray-500">{packSize}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                ${basePrice.toFixed(2)}
              </div>
            </div>
          </div>
        </label>

        {/* Subscription */}
        <label className={`
          block p-4 rounded-xl border-2 cursor-pointer transition-all
          ${purchaseOption === 'subscription' 
            ? 'border-cannabis-500 bg-cannabis-50' 
            : 'border-gray-200 hover:border-cannabis-300'
          }
        `}>
          <input 
            type="radio"
            name="purchase-option"
            value="subscription"
            checked={purchaseOption === 'subscription'}
            onChange={(e) => setPurchaseOption(e.target.value as 'subscription')}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${purchaseOption === 'subscription' ? 'border-cannabis-500' : 'border-gray-300'}
              `}>
                {purchaseOption === 'subscription' && (
                  <div className="w-3 h-3 rounded-full bg-cannabis-500"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800 flex items-center gap-2">
                  Subscribe & Save
                  <span className="bg-cannabis-600 text-white text-xs px-2 py-1 rounded-full">
                    Save 15%
                  </span>
                </div>
                <div className="text-sm text-gray-500">{packSize}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                ${subscriptionPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 line-through">
                ${basePrice.toFixed(2)}
              </div>
            </div>
          </div>
          
          {purchaseOption === 'subscription' && (
            <div className="mt-4 pt-4 border-t border-cannabis-200 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-cannabis-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Save 15% on every subscription
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-cannabis-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Free shipping in the contiguous US
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <svg className="w-4 h-4 text-cannabis-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No commitment, cancel anytime
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-green-700 text-white py-4 px-6 rounded-full font-semibold text-lg hover:bg-green-800 transition-colors shadow-lg">
        Add to Cart
      </button>

      {/* Delivery Info */}
      <div className="text-center text-sm text-gray-600">
        {packSize} delivered one time
      </div>
    </div>
  );
}