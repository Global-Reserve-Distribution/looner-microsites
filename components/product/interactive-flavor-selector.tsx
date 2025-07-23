'use client';

import { useState } from 'react';
import type { Product } from '../../lib/shopify/types';

interface InteractiveFlavorSelectorProps {
  products: Product[];
}

export function InteractiveFlavorSelector({ products }: InteractiveFlavorSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);

  // Create flavor data from products or use defaults
  const flavors = products.length > 0 
    ? products.slice(0, 20).map((product, index) => ({
        id: product.handle,
        name: product.title,
        thc: extractThcContent(product),
        color: getFlavorColor(product.title, index),
        gradientFrom: getGradientColors(product.title, index).from,
        gradientTo: getGradientColors(product.title, index).to,
        image: product.featuredImage?.url,
        description: getFlavorDescription(product.title)
      }))
    : getDefaultFlavors();

  function extractThcContent(product: Product): string {
    const thcMatch = (product.title + ' ' + product.description)
      .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
    return thcMatch ? `${thcMatch[1]}mg` : '5mg';
  }

  function getFlavorDescription(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('orange cream')) return 'Creamy vanilla meets bright citrus';
    if (titleLower.includes('cherry')) return 'Bold cherry with a refreshing finish';
    if (titleLower.includes('strawberry')) return 'Sweet strawberry bliss';
    if (titleLower.includes('grape')) return 'Classic grape soda nostalgia';
    if (titleLower.includes('lemon')) return 'Zesty lemon refreshment';
    if (titleLower.includes('vanilla')) return 'Smooth vanilla dream';
    return 'Premium cannabis-infused flavor';
  }

  function getFlavorColor(title: string, index: number): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('orange')) return 'bg-orange-400';
    if (titleLower.includes('cherry')) return 'bg-red-400';
    if (titleLower.includes('strawberry')) return 'bg-pink-400';
    if (titleLower.includes('cream')) return 'bg-blue-400';
    if (titleLower.includes('vanilla')) return 'bg-purple-400';
    if (titleLower.includes('grape')) return 'bg-purple-500';
    if (titleLower.includes('apple')) return 'bg-green-400';
    if (titleLower.includes('lemon')) return 'bg-yellow-400';
    if (titleLower.includes('lime')) return 'bg-green-500';
    if (titleLower.includes('ginger')) return 'bg-orange-500';
    
    const colors = [
      'bg-orange-400', 'bg-red-400', 'bg-pink-400', 'bg-blue-400', 
      'bg-purple-400', 'bg-green-400', 'bg-yellow-400', 'bg-indigo-400'
    ];
    return colors[index % colors.length];
  }

  function getGradientColors(title: string, index: number): { from: string; to: string } {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('orange')) return { from: 'from-orange-300', to: 'to-orange-500' };
    if (titleLower.includes('cherry')) return { from: 'from-red-300', to: 'to-red-500' };
    if (titleLower.includes('strawberry')) return { from: 'from-pink-300', to: 'to-pink-500' };
    if (titleLower.includes('cream')) return { from: 'from-blue-300', to: 'to-blue-500' };
    if (titleLower.includes('vanilla')) return { from: 'from-purple-300', to: 'to-purple-500' };
    if (titleLower.includes('grape')) return { from: 'from-purple-400', to: 'to-purple-600' };
    if (titleLower.includes('apple')) return { from: 'from-green-300', to: 'to-green-500' };
    if (titleLower.includes('lemon')) return { from: 'from-yellow-300', to: 'to-yellow-500' };
    if (titleLower.includes('lime')) return { from: 'from-green-400', to: 'to-green-600' };
    if (titleLower.includes('ginger')) return { from: 'from-orange-400', to: 'to-orange-600' };
    
    const gradients = [
      { from: 'from-orange-300', to: 'to-orange-500' },
      { from: 'from-red-300', to: 'to-red-500' },
      { from: 'from-pink-300', to: 'to-pink-500' },
      { from: 'from-blue-300', to: 'to-blue-500' },
      { from: 'from-purple-300', to: 'to-purple-500' },
      { from: 'from-green-300', to: 'to-green-500' },
      { from: 'from-yellow-300', to: 'to-yellow-500' },
      { from: 'from-indigo-300', to: 'to-indigo-500' }
    ];
    return gradients[index % gradients.length];
  }

  function getDefaultFlavors() {
    return [
      { id: 'orange-cream', name: 'Orange Cream', thc: '5mg', color: 'bg-orange-400', gradientFrom: 'from-orange-300', gradientTo: 'to-orange-500', image: null, description: 'Creamy vanilla meets bright citrus' },
      { id: 'cherry-cola', name: 'Cherry Cola', thc: '10mg', color: 'bg-red-400', gradientFrom: 'from-red-300', gradientTo: 'to-red-500', image: null, description: 'Bold cherry with a refreshing finish' },
      { id: 'strawberry-vanilla', name: 'Strawberry Vanilla', thc: '5mg', color: 'bg-pink-400', gradientFrom: 'from-pink-300', gradientTo: 'to-pink-500', image: null, description: 'Sweet strawberry bliss' },
      { id: 'cream-soda', name: 'Cream Soda', thc: '15mg', color: 'bg-blue-400', gradientFrom: 'from-blue-300', gradientTo: 'to-blue-500', image: null, description: 'Smooth vanilla dream' },
      { id: 'vintage-cola', name: 'Vintage Cola', thc: '7.5mg', color: 'bg-purple-400', gradientFrom: 'from-purple-300', gradientTo: 'to-purple-500', image: null, description: 'Classic cola with a cannabis twist' },
      { id: 'classic-root-beer', name: 'Classic Root Beer', thc: '10mg', color: 'bg-orange-500', gradientFrom: 'from-orange-400', gradientTo: 'to-orange-600', image: null, description: 'Traditional root beer flavor' },
      { id: 'classic-grape', name: 'Classic Grape', thc: '5mg', color: 'bg-purple-500', gradientFrom: 'from-purple-400', gradientTo: 'to-purple-600', image: null, description: 'Classic grape soda nostalgia' },
      { id: 'crisp-apple', name: 'Crisp Apple', thc: '12.5mg', color: 'bg-green-400', gradientFrom: 'from-green-300', gradientTo: 'to-green-500', image: null, description: 'Fresh apple orchard taste' },
      { id: 'peaches-cream', name: 'Peaches & Cream', thc: '5mg', color: 'bg-orange-300', gradientFrom: 'from-orange-200', gradientTo: 'to-orange-400', image: null, description: 'Southern peach perfection' },
      { id: 'birch-bark', name: 'Birch Bark', thc: '7.5mg', color: 'bg-green-500', gradientFrom: 'from-green-400', gradientTo: 'to-green-600', image: null, description: 'Unique birch beer experience' },
      { id: 'orange-squeeze', name: 'Orange Squeeze', thc: '10mg', color: 'bg-orange-500', gradientFrom: 'from-orange-400', gradientTo: 'to-orange-600', image: null, description: 'Fresh-squeezed citrus burst' },
      { id: 'ginger-ale', name: 'Ginger Ale', thc: '5mg', color: 'bg-green-400', gradientFrom: 'from-green-300', gradientTo: 'to-green-500', image: null, description: 'Spicy ginger refreshment' },
      { id: 'lemon-lime', name: 'Lemon Lime', thc: '7.5mg', color: 'bg-yellow-400', gradientFrom: 'from-yellow-300', gradientTo: 'to-yellow-500', image: null, description: 'Zesty citrus combination' },
      { id: 'doctor-goodwin', name: 'Doctor Goodwin', thc: '10mg', color: 'bg-orange-400', gradientFrom: 'from-orange-300', gradientTo: 'to-orange-500', image: null, description: 'Mysterious doctor pepper blend' },
      { id: 'ginger-lemon', name: 'Ginger Lemon', thc: '5mg', color: 'bg-yellow-300', gradientFrom: 'from-yellow-200', gradientTo: 'to-yellow-400', image: null, description: 'Ginger spice meets lemon zest' },
      { id: 'tropical-punch', name: 'Tropical Punch', thc: '12.5mg', color: 'bg-blue-400', gradientFrom: 'from-blue-300', gradientTo: 'to-blue-500', image: null, description: 'Island paradise in a can' },
      { id: 'cherry-vanilla', name: 'Cherry Vanilla', thc: '7.5mg', color: 'bg-pink-400', gradientFrom: 'from-pink-300', gradientTo: 'to-pink-500', image: null, description: 'Cherry sweetness with vanilla smoothness' },
      { id: 'banana-cream', name: 'Banana Cream', thc: '10mg', color: 'bg-yellow-300', gradientFrom: 'from-yellow-200', gradientTo: 'to-yellow-400', image: null, description: 'Tropical banana cream dream' },
      { id: 'watermelon-lime', name: 'Watermelon Lime', thc: '5mg', color: 'bg-green-400', gradientFrom: 'from-green-300', gradientTo: 'to-green-500', image: null, description: 'Summer watermelon with lime twist' }
    ];
  }

  return (
    <div className="relative -mx-6 px-6 py-12 bg-gradient-to-br from-cream-100 via-cream-50 to-white rounded-3xl">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Flavor Experience</h2>
        <p className="text-lg text-gray-600">Select from our premium THC-infused beverages</p>
      </div>

      {/* Main Flavor Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8 max-w-6xl mx-auto">
        {flavors.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => setSelectedFlavor(flavor.id)}
            onMouseEnter={() => setHoveredFlavor(flavor.id)}
            onMouseLeave={() => setHoveredFlavor(null)}
            className={`
              group relative overflow-hidden rounded-2xl transition-all duration-300 transform
              ${selectedFlavor === flavor.id 
                ? 'scale-105 shadow-2xl ring-4 ring-cannabis-500 ring-offset-2' 
                : 'hover:scale-105 hover:shadow-xl'
              }
            `}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${flavor.gradientFrom} ${flavor.gradientTo} opacity-90`}></div>
            
            {/* Content Container */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Can Visualization */}
              <div className="mb-4 relative">
                <div className="w-24 h-32 mx-auto">
                  {flavor.image ? (
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col items-center justify-center border-2 border-white/30">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold mb-2">LOONER</div>
                        <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                          {flavor.thc}
                        </div>
                        <div className="text-xs mt-2 px-2">THC</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Selection Checkmark */}
                {selectedFlavor === flavor.id && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-cannabis-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Flavor Info */}
              <div className="text-white text-center flex-grow flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-1">
                  {flavor.name}
                </h3>
                <p className="text-sm opacity-90 mb-2">
                  {flavor.thc} THC
                </p>
                {(hoveredFlavor === flavor.id || selectedFlavor === flavor.id) && (
                  <p className="text-xs opacity-80 mt-1">
                    {flavor.description}
                  </p>
                )}
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Selected Flavor Detail */}
      {selectedFlavor && (
        <div className="mt-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            {/* Large Can Preview */}
            <div className={`w-32 h-40 rounded-xl bg-gradient-to-br ${flavors.find(f => f.id === selectedFlavor)?.gradientFrom} ${flavors.find(f => f.id === selectedFlavor)?.gradientTo} p-4 flex items-center justify-center`}>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg w-full h-full flex flex-col items-center justify-center text-white">
                <div className="font-bold text-lg">LOONER</div>
                <div className="text-sm">{flavors.find(f => f.id === selectedFlavor)?.thc}</div>
              </div>
            </div>
            
            {/* Selection Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-cannabis-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-cannabis-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {flavors.find(f => f.id === selectedFlavor)?.name}
                  </h3>
                  <p className="text-gray-600">
                    {flavors.find(f => f.id === selectedFlavor)?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <span className="bg-cannabis-100 text-cannabis-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {flavors.find(f => f.id === selectedFlavor)?.thc} THC
                </span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Lab Tested
                </span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
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