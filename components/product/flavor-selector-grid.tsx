'use client';

import { Product } from 'lib/shopify/types';
import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface FlavorGridItem {
  handle: string;
  title: string;
  featuredImage: string;
  thcContent: string;
  price: string;
  available: boolean;
}

interface FlavorSelectorGridProps {
  activeHandle: string;
  collectionHandle?: string;
  onSelect?: (handle: string) => void;
}

export default function FlavorSelectorGrid({ 
  activeHandle, 
  collectionHandle = 'thc-beverages',
  onSelect 
}: FlavorSelectorGridProps) {
  const [products, setProducts] = useState<FlavorGridItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const collection = await getCollectionProducts({
          collection: collectionHandle,
          sortKey: 'BEST_SELLING'
        });
        
        const flavorItems: FlavorGridItem[] = collection.map((product: Product) => {
          // Extract THC content from product tags or metafields
          const thcTag = product.tags.find(tag => tag.includes('THC'));
          const thcContent = thcTag ? thcTag.replace('THC-', '') + 'mg' : '5mg';
          
          return {
            handle: product.handle,
            title: product.title,
            featuredImage: product.images[0]?.url || '',
            thcContent,
            price: `$${product.priceRange.minVariantPrice.amount}`,
            available: product.availableForSale
          };
        });
        
        setProducts(flavorItems);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [collectionHandle]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-cannabis-primary">Choose Your Flavor</h2>
          <p className="text-text-secondary mt-2">Select from our premium THC beverage collection</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-surface animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cannabis-primary">Choose Your Flavor</h2>
        <p className="text-text-secondary mt-2">Select from our premium THC beverage collection</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <Link
            key={item.handle}
            href={`/product/${item.handle}`}
            onClick={() => onSelect?.(item.handle)}
            className={clsx(
              'group relative aspect-square rounded-lg overflow-hidden transition-all duration-300',
              'border-2 hover:scale-105 hover:shadow-lg',
              'focus:outline-none focus:ring-2 focus:ring-cannabis-accent',
              activeHandle === item.handle 
                ? 'border-cannabis-primary shadow-lg ring-2 ring-cannabis-accent' 
                : 'border-gray-200 hover:border-cannabis-light',
              !item.available && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Product Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.featuredImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* THC Content Badge */}
              <div className="absolute top-2 right-2 bg-cannabis-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                {item.thcContent}
              </div>
              
              {/* Out of Stock Overlay */}
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Out of Stock</span>
                </div>
              )}
              
              {/* Active Selection Indicator */}
              {activeHandle === item.handle && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-cannabis-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
              <h3 className="text-white font-semibold text-sm leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-cannabis-accent font-bold text-sm">
                {item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link 
          href={`/collections/${collectionHandle}`}
          className="inline-flex items-center text-cannabis-primary hover:text-cannabis-light font-medium transition-colors"
        >
          View All Flavors
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}