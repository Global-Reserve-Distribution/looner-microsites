'use client';

import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

interface ProductHeroSectionProps {
  product: Product;
  className?: string;
}

export default function ProductHeroSection({ product, className }: ProductHeroSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = product.images || [];
  const selectedImage = images[selectedImageIndex] || product.featuredImage;

  return (
    <div className={clsx('w-full', className)}>
      {/* Main Product Image */}
      <div className="relative aspect-square w-full max-w-2xl mx-auto mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-cannabis-accent/20 to-cannabis-light/10">
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          />
        )}
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Product Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.tags.includes('new') && (
            <div className="bg-cannabis-primary text-white px-3 py-1 rounded-full text-sm font-bold">
              New
            </div>
          )}
          {product.tags.includes('bestseller') && (
            <div className="bg-warning-orange text-white px-3 py-1 rounded-full text-sm font-bold">
              Best Seller
            </div>
          )}
        </div>
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center mb-6 overflow-x-auto pb-2">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={clsx(
                'flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                selectedImageIndex === index 
                  ? 'border-cannabis-primary ring-2 ring-cannabis-accent' 
                  : 'border-gray-200 hover:border-cannabis-light'
              )}
            >
              <Image
                src={image.url}
                alt={`${product.title} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Story/Description Preview */}
      <div className="text-center max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-cannabis-primary mb-2">
          Crafted for Your Experience
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          {product.description ? 
            product.description.slice(0, 150) + (product.description.length > 150 ? '...' : '') :
            'Premium THC beverage crafted with natural ingredients for the perfect experience.'
          }
        </p>
      </div>
    </div>
  );
}