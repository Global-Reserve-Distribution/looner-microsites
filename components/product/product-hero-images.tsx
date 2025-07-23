'use client';

import { useState } from 'react';
import type { Product } from '../../lib/shopify/types';

interface ProductHeroImagesProps {
  product: Product;
}

export function ProductHeroImages({ product }: ProductHeroImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default images if no product images available
  const defaultImages = [
    { url: '', alt: 'LOONER Orange Cream - Main Product Shot' },
    { url: '', alt: 'LOONER Orange Cream - Lifestyle with Target Badge' },
    { url: '', alt: 'LOONER Orange Cream - On Counter' },
    { url: '', alt: 'LOONER Orange Cream - Served in Glass' }
  ];

  const images = product.images && product.images.length > 0 ? product.images : defaultImages;

  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <div className="bg-cream-200 rounded-3xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        {images[selectedImage]?.url ? (
          <img 
            src={images[selectedImage].url}
            alt={images[selectedImage].altText || product.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-center">
            {/* Default Product Can Illustration */}
            <div className="w-48 h-64 mx-auto bg-gradient-to-b from-orange-200 to-orange-400 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative">
              {/* Can Design */}
              <div className="absolute inset-4 border-4 border-white/50 rounded-xl flex flex-col items-center justify-center text-white">
                <div className="text-4xl font-bold mb-2">LOONER</div>
                <div className="text-lg mb-4">5mg THC</div>
                <div className="text-xl font-semibold">{product.title}</div>
                <div className="text-sm mt-2 text-center px-2">
                  Premium Cannabis Beverage
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute top-8 left-8 w-16 h-32 bg-white/20 rounded-lg transform rotate-12"></div>
            </div>
            
            {/* High Fiber Badge */}
            {selectedImage === 0 && (
              <div className="absolute top-8 right-8 bg-cream-300 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-cannabis-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs font-semibold text-cannabis-800">High Fiber</div>
              </div>
            )}
            
            {/* Target Badge for Lifestyle Image */}
            {selectedImage === 1 && (
              <div className="absolute top-8 right-8">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  New at Target
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              aspect-square rounded-xl overflow-hidden bg-cream-200 border-2 transition-all
              ${selectedImage === index 
                ? 'border-cannabis-500 ring-2 ring-cannabis-200' 
                : 'border-transparent hover:border-cannabis-300'
              }
            `}
          >
            {image.url ? (
              <img 
                src={image.url}
                alt={image.altText || `${product.title} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-10 bg-gradient-to-b from-orange-300 to-orange-500 rounded-sm">
                  <div className="w-6 h-8 m-1 border border-white/50 rounded-sm flex items-center justify-center">
                    <div className="text-[6px] text-white font-bold">L</div>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}