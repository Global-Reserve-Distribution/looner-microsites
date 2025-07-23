import React, { useState } from 'react';

interface Flavor {
  title: string;
  tags: string[];
  bgColor: string;
  primaryColor?: string;
  secondaryColor?: string;
  images: string[];
  variants: Array<{ id: string; title: string; price: number }>;
}

interface FlavorPickerTabsProps {
  flavors: Flavor[];
  varieties?: Flavor[];
  selectedTitle: string;
  onSelect: (flavor: Flavor) => void;
}

export function FlavorPickerTabs({ flavors, varieties = [], selectedTitle, onSelect }: FlavorPickerTabsProps) {
  const [activeTab, setActiveTab] = useState<'flavors' | 'packs'>('flavors');

  // Use only real flavors from Shopify
  const allFlavors = flavors;

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-gray-200">
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
        <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2">
          {allFlavors.map((flavor, index) => {
            const isSelected = flavor.title === selectedTitle;
            const thcContent = flavor.tags.find(tag => tag.toLowerCase().includes('thc')) || '10mg THC';
            
            return (
              <button
                key={`${flavor.title}-${index}`}
                onClick={() => onSelect(flavor)}
                className={`
                  group relative rounded-lg transition-all duration-200 transform
                  ${isSelected 
                    ? 'ring-2 ring-offset-1 ring-gray-800 shadow-md scale-105' 
                    : 'hover:scale-105 cursor-pointer'
                  }
                `}
              >
                <div 
                  className={`
                    p-3 rounded-lg h-full flex flex-col items-center justify-center aspect-[3/4] relative overflow-hidden
                    ${isSelected ? '' : 'opacity-95 hover:opacity-100'}
                  `}
                  style={{
                    backgroundColor: flavor.primaryColor || '#f3f4f6'
                  }}
                >
                  {/* Product Image or Fallback */}
                  <div className="mb-2 relative z-10">
                    {flavor.images && flavor.images[0] ? (
                      <img 
                        src={flavor.images[0]} 
                        alt={flavor.title}
                        className="w-10 h-14 object-contain rounded-md shadow-md"
                      />
                    ) : (
                      <div className="w-10 h-14 bg-white/40 backdrop-blur-sm rounded-md shadow-md flex items-center justify-center">
                        <div className="text-gray-800 text-center">
                          <div className="text-[7px] font-bold">LOONER</div>
                          <div className="text-[5px] mt-0.5">{thcContent.replace(' THC', '')}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Flavor Name */}
                  <h3 className="text-[10px] font-semibold text-gray-900 text-center leading-tight z-10 px-1">
                    {flavor.title}
                  </h3>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Variety Packs */}
      {activeTab === 'packs' && (
        <div className="grid grid-cols-3 gap-4">
          {varieties.length > 0 ? (
            varieties.map((variety) => (
              <button
                key={variety.title}
                onClick={() => onSelect(variety)}
                className={`${variety.bgColor} rounded-xl p-6 text-center transition-all hover:scale-105`}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-white/50 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{variety.title}</h3>
                <p className="text-sm text-gray-600">Variety pack</p>
                <p className="text-xs text-cannabis-600 mt-2">{variety.tags.find(tag => tag.toLowerCase().includes('thc')) || '10mg THC'}</p>
              </button>
            ))
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}