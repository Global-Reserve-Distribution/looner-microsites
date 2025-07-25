import React, { useState, useRef } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { Minus, Plus } from 'lucide-react';

interface PurchaseOptionsProps {
  flavor: {
    title: string;
    variants: Array<{ id: string; title: string; price: number }>;
  };
  variant: { id: string; title: string; price: number };
  onVariantChange: (variant: { id: string; title: string; price: number }) => void;
}

export const PurchaseOptions = React.forwardRef<HTMLDivElement, PurchaseOptionsProps>(function PurchaseOptions(
  { flavor, variant, onVariantChange }, 
  ref
) {

  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [quantity, setQuantity] = useState(1);

  // Add null checks for variant
  if (!flavor || !variant) {
    return (
      <div ref={ref} className="space-y-6">
        <div className="text-center text-gray-500">Loading purchase options...</div>
      </div>
    );
  }

  const subscriptionPrice = variant.price * 0.85; // 15% off for subscription

  return (
    <div ref={ref} className="space-y-6">
      {/* Variant Selector */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Size</h3>
        <div className="flex gap-3">
          {(flavor.variants || []).map((v) => (
            <button
              key={v.id}
              onClick={() => onVariantChange(v)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                variant.id === v.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">{v.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Purchase Type */}
      <div className="space-y-3">
        <label 
          className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
            purchaseType === 'one-time' 
              ? 'border-gray-900 bg-gray-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="purchase"
            value="one-time"
            checked={purchaseType === 'one-time'}
            onChange={() => setPurchaseType('one-time')}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
                {purchaseType === 'one-time' && (
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800">One-Time Purchase</div>
                <div className="text-sm text-gray-500">{variant.title}</div>
              </div>
            </div>
            <div className="text-xl font-bold">${variant.price.toFixed(2)}</div>
          </div>
        </label>

        <label 
          className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
            purchaseType === 'subscription' 
              ? 'border-green-600 bg-green-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="purchase"
            value="subscription"
            checked={purchaseType === 'subscription'}
            onChange={() => setPurchaseType('subscription')}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                {purchaseType === 'subscription' && (
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800 flex items-center gap-2">
                  Subscribe & Save
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Save 15%
                  </span>
                </div>
                <div className="text-sm text-gray-500">{variant.title} delivered monthly</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-700">${subscriptionPrice.toFixed(2)}</div>
              <div className="text-sm text-gray-500 line-through">${variant.price.toFixed(2)}</div>
            </div>
          </div>
        </label>
      </div>

      {/* Quantity Selector and Add to Cart */}
      <div className="flex gap-3 items-stretch">
        {/* Quantity Selector */}
        <div className="flex items-center bg-white border-2 border-gray-200 rounded-full px-1 h-14">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={quantity <= 1}
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="px-4 py-1 text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="flex-1">
          <AddToCartButton
            merchandiseId={variant.id}
            quantity={quantity}
            productTitle={flavor?.title}
            productPrice={`$${variant.price.toFixed(2)}`}
            variant="primary"
            className="h-14"
          />
        </div>
      </div>

      {/* Delivery Info */}
      {purchaseType === 'subscription' && (
        <div className="text-center text-sm text-gray-600">
          <p>🚚 Free shipping on all subscriptions</p>
          <p className="mt-1">Cancel or modify anytime</p>
        </div>
      )}
    </div>
  );
});

PurchaseOptions.displayName = 'PurchaseOptions';