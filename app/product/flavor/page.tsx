'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { FlavorHero } from '../../../components/FlavorHero';
import { LifestyleImageGrid } from '../../../components/LifestyleImageGrid';
import { FlavorPickerTabs } from '../../../components/FlavorPickerTabs';
import { PurchaseOptions } from '../../../components/PurchaseOptions';
import { fetchProducts } from '../../../lib/shopify/server-actions';

function getTagEmoji(tag: string): string {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes('cannabis') || tagLower.includes('infused')) return '🌿';
  if (tagLower.includes('made') || tagLower.includes('cane')) return '🎯';
  if (tagLower.includes('iconic') || tagLower.includes('flavor')) return '⭐';
  if (tagLower.includes('made in') || tagLower.includes('minnesota')) return '📍';
  if (tagLower.includes('high') || tagLower.includes('quality')) return '✨';
  if (tagLower.includes('fiber')) return '🌾';
  if (tagLower.includes('gmo')) return '🌱';
  if (tagLower.includes('sugar')) return '🍯';
  if (tagLower.includes('thc')) return '🌿';
  return '✨';
}

// Transform Shopify products to flavor format
function transformProductsToFlavors(products: any[]) {
  return products.map((product, index) => ({
    title: product.title,
    tags: product.tags || ['Cannabis Infused', 'Made with Cane Sugar', 'Made in Minnesota', 'High Quality'],
    bgColor: getFlavorBgClass(product.title, index),
    images: [
      product.featuredImage?.url || '',
      ...product.images.slice(0, 3).map((img: any) => img.url)
    ],
    variants: [
      { 
        id: `${product.handle}-12`, 
        title: '12 Cans', 
        price: parseFloat(product.priceRange.minVariantPrice.amount) || 35.99 
      },
      { 
        id: `${product.handle}-24`, 
        title: '24 Cans', 
        price: (parseFloat(product.priceRange.minVariantPrice.amount) || 35.99) * 1.8 
      }
    ]
  }));
}

function extractThcContent(product: any): string {
  const thcMatch = (product.title + ' ' + product.description)
    .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
  return thcMatch ? `${thcMatch[1]}mg THC` : '10mg THC';
}

function getFlavorBgClass(title: string, index: number): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('grape')) return 'bg-purple-100';
  if (titleLower.includes('orange')) return 'bg-orange-100';
  if (titleLower.includes('cherry')) return 'bg-red-100';
  if (titleLower.includes('strawberry')) return 'bg-pink-100';
  if (titleLower.includes('cream')) return 'bg-blue-100';
  if (titleLower.includes('vanilla')) return 'bg-purple-100';
  if (titleLower.includes('apple')) return 'bg-green-100';
  if (titleLower.includes('lemon')) return 'bg-yellow-100';
  if (titleLower.includes('lime')) return 'bg-lime-100';
  if (titleLower.includes('ginger')) return 'bg-orange-200';
  
  const colors = [
    'bg-purple-100', 'bg-orange-100', 'bg-red-100', 'bg-pink-100',
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-lime-100'
  ];
  return colors[index % colors.length] || 'bg-purple-100';
}

export default function FlavorPage() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get('flavor');

  const [flavors, setFlavors] = useState<any[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlavors() {
      try {
        const products = await fetchProducts({ sortKey: 'BEST_SELLING' });
        const transformedFlavors = transformProductsToFlavors(products);
        setFlavors(transformedFlavors);

        const defaultFlavor = transformedFlavors.find(f =>
          f.title.toLowerCase().replace(/\s+/g, '-') === slug
        ) || transformedFlavors[0];

        setSelectedFlavor(defaultFlavor);
        setSelectedVariant(defaultFlavor?.variants[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading flavors:', error);
        setLoading(false);
      }
    }

    loadFlavors();
  }, [slug]);

  const varietyPacks = flavors.filter(f => f.tags.includes('Variety'));
  const regularFlavors = flavors.filter(f => !f.tags.includes('Variety'));

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!flavors || flavors.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Flavors unavailable</h1>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${selectedFlavor?.bgColor || 'bg-white'} transition-all duration-500`}>
      <Head>
        <title>{selectedFlavor?.title || 'Loading...'} | LOONER THC Beverages</title>
        <meta name="description" content={`Enjoy the refreshing taste of ${selectedFlavor?.title || 'our signature flavors'}, a premium THC-infused beverage.`} />
        {selectedFlavor && (
          <>
            <meta property="og:title" content={`${selectedFlavor.title} | LOONER THC Beverages`} />
            <meta property="og:description" content={`Enjoy the refreshing taste of ${selectedFlavor.title}, a premium THC-infused beverage.`} />
            <meta property="og:image" content={selectedFlavor.images[0]} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${selectedFlavor.title} | LOONER THC Beverages`} />
            <meta name="twitter:description" content={`Enjoy the refreshing taste of ${selectedFlavor.title}, a premium THC-infused beverage.`} />
            <meta name="twitter:image" content={selectedFlavor.images[0]} />
          </>
        )}
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 max-w-7xl mx-auto">
        {/* Left Column - Product Image & Lifestyle */}
        <div className="space-y-8">
          {/* Large Product Image */}
          <div className="relative">
            <div className={`${selectedFlavor?.bgColor || 'bg-gray-100'} rounded-3xl p-16 aspect-square flex items-center justify-center relative overflow-hidden`}>
              {selectedFlavor?.images[0] ? (
                <img 
                  src={selectedFlavor.images[0]} 
                  alt={selectedFlavor.title}
                  className="w-full h-full object-contain drop-shadow-2xl max-w-sm"
                />
              ) : (
                <div className="w-64 h-80 relative">
                  <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 rounded-[40px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 rounded-t-[40px]"></div>
                    <div className="text-white text-center z-10 px-8">
                      <div className="text-5xl font-bold mb-4">LOONER</div>
                      <div className="text-2xl font-semibold mb-2">{selectedFlavor?.title}</div>
                      <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-lg font-bold">10mg THC</span>
                      </div>
                    </div>
                    <div className="absolute top-20 left-8 w-20 h-40 bg-white/10 rounded-full transform rotate-12 blur-xl"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Tags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFlavor?.tags.map((tag) => (
              <div key={tag} className="text-center">
                <div className="text-2xl mb-2">{getTagEmoji(tag)}</div>
                <div className="font-medium text-gray-800 text-sm">{tag}</div>
                <div className="h-0.5 bg-gray-800 mt-2 mx-auto w-8"></div>
              </div>
            ))}
          </div>

          {/* Lifestyle Images */}
          <LifestyleImageGrid images={selectedFlavor?.images?.slice(1) || []} />
        </div>

        {/* Right Column - Product Info & Selection */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-serif text-gray-900 mb-4">{selectedFlavor?.title}</h1>
            <p className="text-xl text-gray-600">The perfect blend of sweet & tart.</p>
          </div>

          <FlavorPickerTabs
            flavors={regularFlavors}
            varieties={varietyPacks}
            selectedTitle={selectedFlavor?.title}
            onSelect={(flavor) => {
              setSelectedFlavor(flavor);
              setSelectedVariant(flavor.variants[0]);
            }}
          />

          <PurchaseOptions
            flavor={selectedFlavor}
            variant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>
      </div>
    </main>
  );
}