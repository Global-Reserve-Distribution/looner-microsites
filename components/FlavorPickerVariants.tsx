"use client";

import React from "react";

interface FlavorPickerVariantsProps {
  flavors: any[];
  selectedFlavor: any;
  onFlavorSelect: (flavor: any) => void;
  variant?: "olipop" | "premium" | "minimal" | "gradient";
}

export function FlavorPickerVariants({
  flavors,
  selectedFlavor,
  onFlavorSelect,
  variant = "premium"
}: FlavorPickerVariantsProps) {
  const [activeTab, setActiveTab] = React.useState<'flavors' | 'packs'>('flavors');
  
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 justify-center">
        <button 
          onClick={() => setActiveTab('flavors')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'flavors' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Our Flavors
        </button>
        <button 
          onClick={() => setActiveTab('packs')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'packs' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Variety Packs
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {(activeTab === 'flavors' ? flavors : flavors.filter(f => f.title.toLowerCase().includes('variety') || f.title.toLowerCase().includes('pack'))).map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              relative group bg-white rounded-xl overflow-hidden transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl border-2 aspect-square
              ${selectedFlavor?.title === flavor.title 
                ? 'border-green-400 shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Top Half - Primary Color Background */}
            <div 
              className="h-2/3 w-full flex items-center justify-center"
              style={{
                backgroundColor: flavor.primaryColor || '#8B5CF6'
              }}
            >
              {/* Product Image */}
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-12 h-16 object-cover drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-10 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-xs font-bold">LOONER</span>
                </div>
              )}
            </div>
            
            {/* Bottom Third - White Background */}
            <div className="h-1/3 p-2 bg-white flex items-center justify-center">
              {/* Flavor Name Only */}
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-xs leading-tight">
                  {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                </h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}