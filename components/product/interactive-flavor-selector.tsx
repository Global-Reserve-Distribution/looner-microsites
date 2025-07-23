'use client';

import { useState } from 'react';
import type { Product } from '../../lib/shopify/types';

interface InteractiveFlavorSelectorProps {
  products: Product[];
  selectedProductTitle?: string;
}

export function InteractiveFlavorSelector({ products, selectedProductTitle }: InteractiveFlavorSelectorProps) {
  const [activeTab, setActiveTab] = useState<'flavors' | 'packs'>('flavors');
  
  // Set initial selected flavor based on the current product
  const defaultFlavor = selectedProductTitle?.toLowerCase().includes('cherry') ? 'cherry-cola' : 'orange-cream';
  const [selectedFlavor, setSelectedFlavor] = useState<string>(defaultFlavor);
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

  function getFlavorBgColor(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('orange cream')) return '#FFB366';
    if (titleLower.includes('orange')) return '#FFA500';
    if (titleLower.includes('cherry cola')) return '#EE6A6A';
    if (titleLower.includes('cherry')) return '#DC143C';
    if (titleLower.includes('strawberry vanilla')) return '#FFB5C5';
    if (titleLower.includes('strawberry')) return '#FFB5C5';
    if (titleLower.includes('cream soda')) return '#87CEEB';
    if (titleLower.includes('vanilla')) return '#E6E6FA';
    if (titleLower.includes('vintage cola') || titleLower.includes('classic cola')) return '#DDA0DD';
    if (titleLower.includes('cola')) return '#8B4513';
    if (titleLower.includes('root beer')) return '#D2691E';
    if (titleLower.includes('grape')) return '#9370DB';
    if (titleLower.includes('apple')) return '#FFB6C1';
    if (titleLower.includes('peaches')) return '#FFDAB9';
    if (titleLower.includes('ridge rush') || titleLower.includes('birch')) return '#90EE90';
    if (titleLower.includes('lemon lime')) return '#F0E68C';
    if (titleLower.includes('lemon')) return '#FFFF99';
    if (titleLower.includes('lime')) return '#32CD32';
    if (titleLower.includes('ginger ale')) return '#98FB98';
    if (titleLower.includes('ginger')) return '#FFD700';
    if (titleLower.includes('doctor')) return '#D2B48C';
    if (titleLower.includes('tropical punch')) return '#87CEFA';
    if (titleLower.includes('banana')) return '#FFFFE0';
    if (titleLower.includes('watermelon')) return '#FFB6C1';
    return '#E0E0E0';
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
    <div>
      {/* Tabs */}
      <div className="flex gap-8 mb-8">
        <button 
          onClick={() => setActiveTab('flavors')}
          className={`pb-3 text-lg font-semibold transition-all ${
            activeTab === 'flavors' 
              ? 'text-gray-900 border-b-2 border-gray-900' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Our Flavors
        </button>
        <button 
          onClick={() => setActiveTab('packs')}
          className={`pb-3 text-lg font-semibold transition-all ${
            activeTab === 'packs' 
              ? 'text-gray-900 border-b-2 border-gray-900' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Variety Packs
        </button>
      </div>

      {/* Flavor Grid */}
      {activeTab === 'flavors' && (
        <div className="grid grid-cols-5 gap-2">
          {flavors.map((flavor) => (
            <button
              key={flavor.id}
              onClick={() => setSelectedFlavor(flavor.id)}
              onMouseEnter={() => setHoveredFlavor(flavor.id)}
              onMouseLeave={() => setHoveredFlavor(null)}
              className={`
                group relative rounded-lg transition-all duration-200 transform
                ${selectedFlavor === flavor.id 
                  ? 'ring-2 ring-offset-1 ring-gray-800 shadow-md scale-105' 
                  : 'hover:scale-105'
                }
              `}
            >
              {/* Flavor Card */}
              <div className={`
                p-3 rounded-lg h-full flex flex-col items-center justify-center aspect-[3/4] relative overflow-hidden
                ${selectedFlavor === flavor.id ? '' : 'opacity-95 hover:opacity-100'}
              `} style={{backgroundColor: getFlavorBgColor(flavor.name)}}>
                {/* Can Icon */}
                <div className="mb-2 relative z-10">
                  {flavor.image ? (
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="w-10 h-14 object-contain drop-shadow-md"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-white/40 backdrop-blur-sm rounded-md shadow-md flex items-center justify-center">
                      <div className="text-white/90 text-center">
                        <div className="text-[7px] font-bold">LOONER</div>
                        <div className="text-[5px] mt-0.5">{flavor.thc}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Flavor Name */}
                <h3 className="text-[10px] font-semibold text-gray-900 text-center leading-tight z-10 px-1">
                  {flavor.name}
                </h3>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Variety Packs */}
      {activeTab === 'packs' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/50 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Variety Pack</h3>
            <p className="text-sm text-gray-600">Mix of 6 flavors</p>
            <p className="text-xs text-cannabis-600 mt-2">5-10mg THC</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/50 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🌈</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Fruit Pack</h3>
            <p className="text-sm text-gray-600">All fruit flavors</p>
            <p className="text-xs text-cannabis-600 mt-2">5mg THC</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/50 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🔥</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Strong Pack</h3>
            <p className="text-sm text-gray-600">High potency mix</p>
            <p className="text-xs text-cannabis-600 mt-2">10-15mg THC</p>
          </div>
        </div>
      )}
    </div>
  );
}