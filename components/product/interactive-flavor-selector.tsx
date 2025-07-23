'use client';

import { useState } from 'react';
import type { Product } from '../../lib/shopify/types';

interface InteractiveFlavorSelectorProps {
  products: Product[];
}

export function InteractiveFlavorSelector({ products }: InteractiveFlavorSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  // Create flavor data from products or use defaults
  const flavors = products.length > 0 
    ? products.slice(0, 20).map((product, index) => ({
        id: product.handle,
        name: product.title,
        thc: extractThcContent(product),
        color: getFlavorColor(product.title, index),
        image: product.featuredImage?.url
      }))
    : getDefaultFlavors();

  function extractThcContent(product: Product): string {
    const thcMatch = (product.title + ' ' + product.description)
      .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
    return thcMatch ? `${thcMatch[1]}mg` : '5mg';
  }

  function getFlavorColor(title: string, index: number): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('orange')) return 'bg-orange-300';
    if (titleLower.includes('cherry')) return 'bg-red-300';
    if (titleLower.includes('strawberry')) return 'bg-pink-300';
    if (titleLower.includes('cream')) return 'bg-blue-300';
    if (titleLower.includes('vanilla')) return 'bg-purple-300';
    if (titleLower.includes('grape')) return 'bg-purple-400';
    if (titleLower.includes('apple')) return 'bg-yellow-300';
    if (titleLower.includes('lemon')) return 'bg-yellow-400';
    if (titleLower.includes('lime')) return 'bg-green-300';
    if (titleLower.includes('ginger')) return 'bg-orange-400';
    
    const colors = [
      'bg-orange-300', 'bg-red-300', 'bg-pink-300', 'bg-blue-300', 
      'bg-purple-300', 'bg-green-300', 'bg-yellow-300', 'bg-indigo-300'
    ];
    return colors[index % colors.length];
  }

  function getDefaultFlavors() {
    return [
      { id: 'orange-cream', name: 'Orange Cream', thc: '5mg', color: 'bg-orange-300', image: null },
      { id: 'cherry-cola', name: 'Cherry Cola', thc: '10mg', color: 'bg-red-300', image: null },
      { id: 'strawberry-vanilla', name: 'Strawberry Vanilla', thc: '5mg', color: 'bg-pink-300', image: null },
      { id: 'cream-soda', name: 'Cream Soda', thc: '15mg', color: 'bg-blue-300', image: null },
      { id: 'vintage-cola', name: 'Vintage Cola', thc: '7.5mg', color: 'bg-purple-300', image: null },
      { id: 'classic-root-beer', name: 'Classic Root Beer', thc: '10mg', color: 'bg-orange-400', image: null },
      { id: 'classic-grape', name: 'Classic Grape', thc: '5mg', color: 'bg-purple-400', image: null },
      { id: 'crisp-apple', name: 'Crisp Apple', thc: '12.5mg', color: 'bg-yellow-300', image: null },
      { id: 'peaches-cream', name: 'Peaches & Cream', thc: '5mg', color: 'bg-peach-300', image: null },
      { id: 'birch-bark', name: 'Birch Bark', thc: '7.5mg', color: 'bg-green-400', image: null },
      { id: 'orange-squeeze', name: 'Orange Squeeze', thc: '10mg', color: 'bg-orange-400', image: null },
      { id: 'ginger-ale', name: 'Ginger Ale', thc: '5mg', color: 'bg-green-300', image: null },
      { id: 'lemon-lime', name: 'Lemon Lime', thc: '7.5mg', color: 'bg-yellow-400', image: null },
      { id: 'doctor-goodwin', name: 'Doctor Goodwin', thc: '10mg', color: 'bg-orange-300', image: null },
      { id: 'ginger-lemon', name: 'Ginger Lemon', thc: '5mg', color: 'bg-yellow-300', image: null },
      { id: 'tropical-punch', name: 'Tropical Punch', thc: '12.5mg', color: 'bg-blue-300', image: null },
      { id: 'cherry-vanilla', name: 'Cherry Vanilla', thc: '7.5mg', color: 'bg-pink-300', image: null },
      { id: 'banana-cream', name: 'Banana Cream', thc: '10mg', color: 'bg-yellow-300', image: null },
      { id: 'watermelon-lime', name: 'Watermelon Lime', thc: '5mg', color: 'bg-green-300', image: null }
    ];
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-5 gap-3">
        {flavors.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => setSelectedFlavor(flavor.id)}
            className={`
              group relative aspect-square rounded-2xl p-4 text-center transition-all duration-200
              ${selectedFlavor === flavor.id 
                ? 'bg-white border-2 border-cannabis-600 shadow-lg' 
                : 'bg-white/80 border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            {/* Product Can */}
            <div className="mb-3">
              {flavor.image ? (
                <div className="w-12 h-16 mx-auto rounded-lg overflow-hidden">
                  <img 
                    src={flavor.image} 
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`
                  w-12 h-16 mx-auto rounded-lg ${flavor.color} 
                  flex items-center justify-center text-white text-xs font-bold
                `}>
                  <div className="text-center">
                    <div className="text-[8px] mb-1">LOONER</div>
                    <div className="text-[6px]">{flavor.thc}</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Flavor Name */}
            <div className="text-xs font-medium text-gray-900 mb-1 leading-tight">
              {flavor.name}
            </div>
            
            {/* THC Content */}
            <div className="text-[10px] text-gray-600">
              {flavor.thc}
            </div>
            
            {/* Selection Border */}
            {selectedFlavor === flavor.id && (
              <div className="absolute inset-0 rounded-2xl ring-2 ring-cannabis-600 ring-offset-2"></div>
            )}
          </button>
        ))}
      </div>
      
      {selectedFlavor && (
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cannabis-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {flavors.find(f => f.id === selectedFlavor)?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {flavors.find(f => f.id === selectedFlavor)?.thc} THC
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Selected
            </div>
          </div>
        </div>
      )}
    </div>
  );
}