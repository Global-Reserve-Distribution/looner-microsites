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
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-0">
        <div className="flex w-full">
          <button 
            onClick={() => setActiveTab('flavors')}
            className={`flex-1 py-3 text-sm font-medium transition-all rounded-t-xl border-t border-l border-r relative ${
              activeTab === 'flavors' 
                ? 'bg-white text-gray-800 border-gray-200 z-10' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
            }`}
            style={{
              marginBottom: activeTab === 'flavors' ? '-1px' : '0'
            }}
          >
            Our Flavors
          </button>
          <button 
            onClick={() => setActiveTab('packs')}
            className={`flex-1 py-3 text-sm font-medium transition-all rounded-t-xl border-t border-l border-r relative ${
              activeTab === 'packs' 
                ? 'bg-white text-gray-800 border-gray-200 z-10' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300'
            }`}
            style={{
              marginBottom: activeTab === 'packs' ? '-1px' : '0'
            }}
          >
            Variety Packs
          </button>
        </div>
      </div>
      
      {/* Content Area with Tab Connection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Olipop-style Mixed Grid Layout */}
      <div className="grid grid-cols-6 gap-4 auto-rows-fr">
        {/* Main Product Cards - Larger */}
        {(activeTab === 'flavors' ? flavors : flavors.filter(f => f.title.toLowerCase().includes('variety') || f.title.toLowerCase().includes('pack'))).slice(0, 4).map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              col-span-3 row-span-2 relative group bg-white rounded-3xl overflow-hidden transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl border-2 aspect-square
              ${selectedFlavor?.title === flavor.title 
                ? 'border-green-400 shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Full Height Background with Image */}
            <div 
              className="h-full w-full flex items-center justify-center rounded-3xl relative"
              style={{
                backgroundColor: flavor.primaryColor || '#8B5CF6'
              }}
            >
              {/* Product Image */}
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-40 h-48 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-32 h-40 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-lg font-bold">LOONER</span>
                </div>
              )}
              
              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white h-1/3 flex items-center justify-center rounded-b-3xl">
                <div className="text-center px-4">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight">
                    {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                  </h4>
                </div>
              </div>
            </div>
          </button>
        ))}
        
        {/* Feature Tag Cards - Smaller */}
        <div className="col-span-3 row-span-1 bg-orange-100 rounded-2xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-bold text-gray-800">10mg THC</h3>
          </div>
        </div>
        
        <div className="col-span-3 row-span-1 bg-green-100 rounded-2xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">🌿</div>
            <h3 className="font-bold text-gray-800">Cane Sugar</h3>
          </div>
        </div>
        
        <div className="col-span-2 row-span-1 bg-blue-100 rounded-2xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl mb-1">⭐</div>
            <h3 className="font-bold text-gray-800 text-sm">High Quality</h3>
          </div>
        </div>
        
        <div className="col-span-2 row-span-1 bg-purple-100 rounded-2xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl mb-1">🥤</div>
            <h3 className="font-bold text-gray-800 text-sm">Soda</h3>
          </div>
        </div>
        
        <div className="col-span-2 row-span-1 bg-yellow-100 rounded-2xl p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl mb-1">🍃</div>
            <h3 className="font-bold text-gray-800 text-sm">Natural</h3>
          </div>
        </div>
        
        {/* Additional Product Cards */}
        {(activeTab === 'flavors' ? flavors : flavors.filter(f => f.title.toLowerCase().includes('variety') || f.title.toLowerCase().includes('pack'))).slice(4, 6).map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              col-span-2 row-span-2 relative group bg-white rounded-2xl overflow-hidden transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl border-2 aspect-square
              ${selectedFlavor?.title === flavor.title 
                ? 'border-green-400 shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Full Height Background with Image */}
            <div 
              className="h-full w-full flex items-center justify-center rounded-2xl relative"
              style={{
                backgroundColor: flavor.primaryColor || '#8B5CF6'
              }}
            >
              {/* Product Image */}
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-20 h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-16 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-sm font-bold">LOONER</span>
                </div>
              )}
              
              {/* Text Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white h-1/3 flex items-center justify-center rounded-b-2xl">
                <div className="text-center px-2">
                  <h4 className="font-bold text-gray-900 text-xs leading-tight">
                    {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                  </h4>
                </div>
              </div>
            </div>
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}