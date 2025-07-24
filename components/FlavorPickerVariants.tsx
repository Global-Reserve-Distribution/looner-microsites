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
            {/* Full Height Background with Image */}
            <div 
              className="h-full w-full flex items-center justify-center rounded-xl relative"
              style={{
                backgroundColor: flavor.primaryColor || '#8B5CF6'
              }}
            >
              {/* Product Image */}
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-16 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-12 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-xs font-bold">LOONER</span>
                </div>
              )}
              
              {/* Text Overlay at Bottom - Half Height */}
              <div className="absolute bottom-0 left-0 right-0 bg-white h-1/2 flex items-center justify-center rounded-b-xl">
                <div className="text-center px-2">
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">
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