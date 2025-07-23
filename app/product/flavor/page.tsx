'use client';

import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { FlavorHero } from '../../../components/FlavorHero';
import { LifestyleImageGrid } from '../../../components/LifestyleImageGrid';
import { FlavorPickerTabs } from '../../../components/FlavorPickerTabs';
import { PurchaseOptions } from '../../../components/PurchaseOptions';
import { FlavorBackground } from '../../../components/FlavorBackground';
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

// Generate colors based on product name/title
function generateColorsFromProduct(productTitle: string, index: number): { primary: string; secondary: string } {
  const title = productTitle.toLowerCase();
  
  // Color palettes for different flavor profiles
  const flavorColors: Record<string, { primary: string; secondary: string }> = {
    // Citrus flavors
    lemon: { primary: '#FEF08A', secondary: '#FEF3C7' },
    lime: { primary: '#BEF264', secondary: '#D9F99D' },
    orange: { primary: '#FED7AA', secondary: '#FEDD7E' },
    grapefruit: { primary: '#FCA5A5', secondary: '#FECACA' },
    
    // Berry flavors
    strawberry: { primary: '#F9A8D4', secondary: '#FBB6CE' },
    cherry: { primary: '#F87171', secondary: '#FCA5A5' },
    grape: { primary: '#C084FC', secondary: '#DDD6FE' },
    blueberry: { primary: '#93C5FD', secondary: '#BFDBFE' },
    raspberry: { primary: '#EC4899', secondary: '#F9A8D4' },
    
    // Tropical flavors
    mango: { primary: '#FBBF24', secondary: '#FCD34D' },
    pineapple: { primary: '#FACC15', secondary: '#FDE047' },
    coconut: { primary: '#F3F4F6', secondary: '#F9FAFB' },
    passion: { primary: '#F59E0B', secondary: '#FBBF24' },
    
    // Mint and herbs
    mint: { primary: '#6EE7B7', secondary: '#A7F3D0' },
    basil: { primary: '#84CC16', secondary: '#A3E635' },
    
    // Classic soda flavors
    cola: { primary: '#92400E', secondary: '#B45309' },
    root: { primary: '#78350F', secondary: '#92400E' },
    vanilla: { primary: '#FEF7CD', secondary: '#FFFBEB' },
    
    // Cannabis themed
    cannabis: { primary: '#16A34A', secondary: '#22C55E' },
    hemp: { primary: '#15803D', secondary: '#16A34A' },
  };
  
  // Default fallback colors
  const defaultColors: { primary: string; secondary: string }[] = [
    { primary: '#10B981', secondary: '#6EE7B7' }, // Emerald
    { primary: '#3B82F6', secondary: '#93C5FD' }, // Blue
    { primary: '#8B5CF6', secondary: '#C4B5FD' }, // Violet
    { primary: '#EF4444', secondary: '#FCA5A5' }, // Red
    { primary: '#F59E0B', secondary: '#FCD34D' }, // Amber
    { primary: '#06B6D4', secondary: '#67E8F9' }, // Cyan
  ];
  
  // Check for specific flavor keywords
  for (const [flavor, colors] of Object.entries(flavorColors)) {
    if (title.includes(flavor)) {
      return colors;
    }
  }
  
  // Cannabis-specific terms
  if (title.includes('thc') || title.includes('cannabis') || title.includes('hemp')) {
    return { primary: '#16A34A', secondary: '#22C55E' };
  }
  
  // Use default palette with index rotation
  const colorIndex = Math.abs(index) % defaultColors.length;
  return defaultColors[colorIndex] || defaultColors[0];
}

// Extract color metafields from Shopify product or generate them
function extractColorMetafields(product: any, index: number) {
  const metafields = product.metafields || [];
  const primaryColorField = metafields.find((field: any) => field && field.key === 'primary_color');
  const secondaryColorField = metafields.find((field: any) => field && field.key === 'secondary_color');
  
  // If we have metafield colors, use them
  if (primaryColorField?.value && secondaryColorField?.value) {
    return {
      primaryColor: primaryColorField.value,
      secondaryColor: secondaryColorField.value
    };
  }
  
  // Otherwise generate colors based on product characteristics  
  const generatedColors = generateColorsFromProduct(product.title, index);
  
  return {
    primaryColor: primaryColorField?.value || generatedColors.primary,
    secondaryColor: secondaryColorField?.value || generatedColors.secondary
  };
}

// Transform Shopify products to flavor format
function transformProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor } = extractColorMetafields(product, index);
    
    return {
      title: product.title,
      description: product.description || '',
      tags: product.tags || ['Cannabis Infused', 'Made with Cane Sugar', 'Made in Minnesota', 'High Quality'],
      bgColor: primaryColor ? `bg-[${primaryColor}]` : getFlavorBgClass(product.title, index),
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
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
    };
  });
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
    <main className="relative overflow-hidden min-h-screen transition-all duration-500">
      <FlavorBackground color={selectedFlavor?.primaryColor || '#FFE5B4'} />
      
      <div className="relative z-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 max-w-7xl mx-auto">
        {/* Left Column - Product Image & Lifestyle */}
        <div className="space-y-8">
          {/* Large Product Image */}
          <div className="relative">
            <div 
              className="rounded-3xl p-16 aspect-square flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundColor: selectedFlavor?.secondaryColor || '#f3f4f6'
              }}
            >
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
            {selectedFlavor?.tags.map((tag: string) => (
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
      
      {/* Product Information Section with Wavy Borders */}
      <div className="relative">
        {/* Top Wavy Border */}
        <svg
          className="w-full h-16"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 L1200,80 L0,80 Z"
            fill={selectedFlavor?.primaryColor || '#CCFBF1'}
          />
        </svg>

        <div 
          className="py-16" 
          style={{
            backgroundColor: selectedFlavor?.primaryColor || '#CCFBF1'
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Product Description */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedFlavor?.title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {selectedFlavor?.description || 'Experience the perfect balance of refreshing taste and premium cannabis infusion. Each can is carefully crafted with natural cane sugar and features our signature blend that delivers consistent effects every time.'}
              </p>
            </div>

            {/* Nutrition Facts */}
            <div className="lg:col-span-1">
              <div 
                className="rounded-lg p-6 shadow-sm text-white"
                style={{
                  backgroundColor: selectedFlavor?.primaryColor || '#4B5563'
                }}
              >
                <h3 className="text-lg font-bold text-white mb-4 text-center border-b-2 border-white pb-2">
                  Nutrition Facts
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-white/30 pb-1">
                    <span>Serving Size</span>
                    <span className="font-medium">1 can (12 fl oz)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/30 pb-1">
                    <span>Calories</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between border-b border-white/30 pb-1">
                    <span>Total Sugars</span>
                    <span className="font-medium">8g</span>
                  </div>
                  <div className="flex justify-between border-b border-white/30 pb-1">
                    <span>Sodium</span>
                    <span className="font-medium">15mg</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-white pb-2 pt-2">
                    <span className="font-bold">THC Content</span>
                    <span className="font-bold">10mg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Cannabis Infused</h4>
                  <p className="text-xs text-gray-600">Premium THC extract</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Non GMO</h4>
                  <p className="text-xs text-gray-600">Natural ingredients</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🍯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Less Sugar</h4>
                  <p className="text-xs text-gray-600">Only 8g per can</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Made in Minnesota</h4>
                  <p className="text-xs text-gray-600">Locally crafted</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">High Quality</h4>
                  <p className="text-xs text-gray-600">Lab tested purity</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Consistent</h4>
                  <p className="text-xs text-gray-600">Reliable effects</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wavy Border */}
        <svg
          className="w-full h-16"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,0 L0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40 L1200,0 Z"
            fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
          />
        </svg>
      </div>

      {/* Simple Wavy Footer Bar */}
      <div className="relative h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,120 C200,140 400,100 600,120 C800,140 1000,100 1200,120 L1200,200 L0,200 Z"
            fill="#4ECDC4"
          />
        </svg>
      </div>
      </div>
    </main>
  );
}