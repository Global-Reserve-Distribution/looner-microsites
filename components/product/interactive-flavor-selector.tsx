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
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {flavors.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => setSelectedFlavor(flavor.id)}
            className={`
              group relative rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${flavor.color} 
              ${selectedFlavor === flavor.id 
                ? 'ring-4 ring-cannabis-600 ring-offset-2 shadow-2xl scale-105' 
                : 'hover:shadow-lg'
              }
            `}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 rounded-3xl opacity-10">
              <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full opacity-50"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full opacity-30"></div>
            </div>
            
            {/* Product Can Visual */}
            <div className="relative z-10 mb-4">
              {flavor.image ? (
                <div className="w-20 h-28 mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-white/50">
                  <img 
                    src={flavor.image} 
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-28 mx-auto bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-lg border-2 border-white/50 flex flex-col items-center justify-center backdrop-blur-sm">
                  <div className="text-sm font-bold text-gray-800 mb-2">LOONER</div>
                  <div className="text-xs text-cannabis-600 font-bold bg-cannabis-100 px-2 py-1 rounded-full mb-1">
                    {flavor.thc}
                  </div>
                  <div className="text-xs text-gray-700 text-center leading-tight px-1 font-medium">
                    {flavor.name.length > 12 ? flavor.name.split(' ')[0] : flavor.name}
                  </div>
                </div>
              )}
            </div>
            
            {/* Flavor Info */}
            <div className="relative z-10">
              <div className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                {flavor.name}
              </div>
              <div className="text-xs text-cannabis-700 font-semibold bg-white/60 inline-block px-2 py-1 rounded-full">
                {flavor.thc} THC
              </div>
            </div>
            
            {/* Selection Indicator */}
            {selectedFlavor === flavor.id && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-cannabis-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
      
      {selectedFlavor && (
        <div className="p-6 bg-gradient-to-r from-cannabis-50 to-cannabis-100 rounded-2xl border-2 border-cannabis-200 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cannabis-500 to-cannabis-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold text-cannabis-900 mb-1">
                {flavors.find(f => f.id === selectedFlavor)?.name} Selected
              </div>
              <div className="text-cannabis-700 font-medium">
                {flavors.find(f => f.id === selectedFlavor)?.thc} THC content • Premium Cannabis Beverage
              </div>
              <div className="mt-2 flex gap-2">
                <span className="bg-cannabis-200 text-cannabis-800 text-xs px-3 py-1 rounded-full font-semibold">
                  Lab Tested
                </span>
                <span className="bg-cannabis-200 text-cannabis-800 text-xs px-3 py-1 rounded-full font-semibold">
                  Fast Acting
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}