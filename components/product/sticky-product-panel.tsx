'use client';

import { Product } from 'lib/shopify/types';
import { useState } from 'react';
import { AddToCart } from 'components/cart/add-to-cart';
import { useProduct } from 'components/product/product-context';
import THCContentBadge from './thc-content-badge';
import clsx from 'clsx';

interface StickyProductPanelProps {
  product: Product;
  className?: string;
}

export default function StickyProductPanel({ product, className }: StickyProductPanelProps) {
  const { state } = useProduct();
  const [quantity, setQuantity] = useState(1);
  const [showSubscription, setShowSubscription] = useState(false);

  // Extract THC/CBD content from product tags or metafields
  const extractCannabisContent = () => {
    const thcTag = product.tags.find(tag => tag.includes('THC'));
    const cbdTag = product.tags.find(tag => tag.includes('CBD'));
    
    const thcAmount = thcTag ? parseInt(thcTag.replace(/\D/g, '')) || 5 : 5;
    const cbdAmount = cbdTag ? parseInt(cbdTag.replace(/\D/g, '')) || 0 : 0;
    
    return { thcAmount, cbdAmount };
  };

  const { thcAmount, cbdAmount } = extractCannabisContent();
  const selectedVariant = state.selectedVariant || product.variants[0];
  const price = selectedVariant && typeof selectedVariant !== 'string' ? selectedVariant.price.amount : product.priceRange.minVariantPrice.amount;

  // Benefits extracted from product tags
  const benefits = [
    { icon: '🌿', label: 'All Natural', active: product.tags.includes('natural') },
    { icon: '🚫', label: 'No Sugar', active: product.tags.includes('sugar-free') },
    { icon: '🌱', label: 'Vegan', active: product.tags.includes('vegan') },
    { icon: '✨', label: 'Organic', active: product.tags.includes('organic') }
  ].filter(benefit => benefit.active);

  return (
    <div className={clsx(
      'bg-white border border-gray-200 rounded-xl p-6 shadow-lg',
      'sticky top-6 z-40',
      // Mobile: transform to bottom sheet
      'md:relative md:transform-none',
      'fixed bottom-0 left-0 right-0 md:static',
      'md:w-auto w-full md:rounded-xl rounded-t-xl',
      className
    )}>
      {/* Mobile Handle */}
      <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
      
      {/* Product Title & Price */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cannabis-primary mb-2">
          {product.title}
        </h1>
        <div className="text-3xl font-bold text-text-primary">
          ${price}
        </div>
      </div>

      {/* THC Content Badge */}
      <div className="mb-6">
        <THCContentBadge 
          thcAmount={thcAmount} 
          cbdAmount={cbdAmount}
          className="w-full justify-center"
        />
      </div>

      {/* Variant Selector (if multiple variants) */}
      {product.options.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {product.options[0]?.name || 'Variant'}
          </label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cannabis-accent focus:border-transparent"
            value={selectedVariant && typeof selectedVariant !== 'string' ? selectedVariant.id : ''}
            onChange={(e) => {
              // Handle variant selection through product context
              console.log('Variant selected:', e.target.value);
            }}
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title} - ${variant.price.amount}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-cannabis-primary hover:bg-gray-50 transition-colors"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-cannabis-primary hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mb-6">
        <div className="w-full bg-cannabis-primary hover:bg-cannabis-light text-white font-bold py-3 px-6 rounded-lg transition-colors">
          <AddToCart product={product} />
        </div>
      </div>

      {/* Subscription Toggle */}
      <div className="mb-6 p-4 bg-cannabis-accent bg-opacity-10 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-semibold text-cannabis-primary">Subscribe & Save</h4>
            <p className="text-sm text-text-secondary">Get 15% off with monthly delivery</p>
          </div>
          <button
            onClick={() => setShowSubscription(!showSubscription)}
            className={clsx(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              showSubscription ? 'bg-cannabis-primary' : 'bg-gray-200'
            )}
          >
            <span
              className={clsx(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                showSubscription ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        </div>
        {showSubscription && (
          <div className="text-sm text-text-secondary">
            <p>Delivered every 30 days. Cancel anytime.</p>
            <p className="font-semibold text-cannabis-primary mt-1">
              Your price: ${(parseFloat(price) * 0.85).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Benefits Grid */}
      {benefits.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-text-primary mb-3">Key Benefits</h4>
          <div className="grid grid-cols-2 gap-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{benefit.icon}</span>
                <span className="text-text-secondary">{benefit.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Store Locator */}
      <div className="border-t pt-4">
        <button className="w-full text-cannabis-primary hover:text-cannabis-light font-medium text-sm flex items-center justify-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find in Store Near You
        </button>
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-4 text-xs text-text-secondary border-t pt-3">
        <p>
          🔞 For adults 21+ only. Keep out of reach of children and pets. 
          Do not drive or operate machinery after use.
        </p>
      </div>
    </div>
  );
}