'use client';

import { Product } from 'lib/shopify/types';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { AddToCartButton } from 'components/AddToCartButton';

interface ShopProductCardProps {
  product: Product;
  backgroundColor: string;
}

export default function ShopProductCard({ product, backgroundColor }: ShopProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Safety checks for product data
  if (!product) {
    return null;
  }
  
  // Get the first variant for pricing
  const firstVariant = product.variants?.[0];
  const price = typeof firstVariant?.price === 'object' 
    ? firstVariant.price.amount 
    : firstVariant?.price || '35.99';
  
  // Determine product route based on tags
  const getProductRoute = () => {
    if (!product.tags || !Array.isArray(product.tags)) {
      return '/products/sodas/10mg'; // Default fallback
    }
    
    const tags = product.tags.map(tag => String(tag).toLowerCase());
    
    if (tags.includes('10mg') || tags.includes('10')) {
      return '/products/sodas/10mg';
    } else if (tags.includes('50mg') || tags.includes('50')) {
      return '/products/sodas/50mg';
    } else if (tags.some(tag => ['gummy', 'gummies', 'edible', 'edibles'].includes(tag))) {
      return '/products/gummies';
    } else {
      return '/products/sodas/10mg'; // Default fallback
    }
  };

  // Extract THC content from product title or tags
  const getThcContent = () => {
    const title = (product.title || '').toLowerCase();
    const tags = Array.isArray(product.tags) ? product.tags.join(' ').toLowerCase() : '';
    
    if (title.includes('10mg') || tags.includes('10mg')) return '10mg';
    if (title.includes('50mg') || tags.includes('50mg')) return '50mg';
    if (title.includes('5mg') || tags.includes('5mg')) return '5mg';
    return '10mg'; // Default
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {product.featuredImage?.url ? (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="w-auto h-48 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-32 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        
        {/* THC Badge */}
        <div className="absolute top-4 right-4 bg-[#14433d] text-white px-3 py-1 rounded-full text-xs font-bold">
          {getThcContent()}
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <Link
                href={getProductRoute()}
                className="text-[#14433d] font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white/90 backdrop-blur-sm">
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">(4.8)</span>
        </div>

        {/* Product Title */}
        <h3 className="text-[#14433d] font-black text-lg mb-2 line-clamp-2">
          {product.title || 'Untitled Product'}
        </h3>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[#14433d] font-bold text-lg">
            ${price}
          </span>
          
          <AddToCartButton
            merchandiseId={firstVariant?.id || ''}
            variant="compact"
            className="bg-[#14433d] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#14433d]/90 transition-colors"
          >
            Add
          </AddToCartButton>
        </div>

        {/* Short Description */}
        {product.description && typeof product.description === 'string' && (
          <p className="text-[#14433d]/70 text-sm mt-2 line-clamp-2">
            {product.description.length > 80 
              ? `${product.description.substring(0, 80)}...`
              : product.description
            }
          </p>
        )}
      </div>
    </div>
  );
}