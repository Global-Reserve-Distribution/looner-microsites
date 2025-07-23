import React, { useState } from 'react';

interface Flavor {
  title: string;
  tags: string[];
  bgColor: string;
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

  // Extended flavor list for display
  const allFlavors = [
    ...flavors,
    { title: 'Cherry Cola', bgColor: 'bg-red-100', thc: '10mg' },
    { title: 'Strawberry Vanilla', bgColor: 'bg-pink-100', thc: '5mg' },
    { title: 'Cream Soda', bgColor: 'bg-blue-100', thc: '15mg' },
    { title: 'Vintage Cola', bgColor: 'bg-purple-100', thc: '7.5mg' },
    { title: 'Classic Root Beer', bgColor: 'bg-orange-200', thc: '10mg' },
    { title: 'Crisp Apple', bgColor: 'bg-green-100', thc: '12.5mg' },
    { title: 'Peaches & Cream', bgColor: 'bg-peach-100', thc: '5mg' },
    { title: 'Birch Bark', bgColor: 'bg-green-200', thc: '7.5mg' },
    { title: 'Orange Squeeze', bgColor: 'bg-orange-300', thc: '10mg' },
    { title: 'Ginger Ale', bgColor: 'bg-yellow-100', thc: '5mg' },
    { title: 'Lemon Lime', bgColor: 'bg-lime-100', thc: '7.5mg' },
    { title: 'Doctor Goodwin', bgColor: 'bg-brown-100', thc: '10mg' },
    { title: 'Ginger Lemon', bgColor: 'bg-yellow-200', thc: '5mg' },
    { title: 'Tropical Punch', bgColor: 'bg-cyan-100', thc: '12.5mg' },
    { title: 'Cherry Vanilla', bgColor: 'bg-pink-200', thc: '7.5mg' },
    { title: 'Banana Cream', bgColor: 'bg-yellow-100', thc: '10mg' },
    { title: 'Watermelon Lime', bgColor: 'bg-green-100', thc: '5mg' }
  ];

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
            const flavorObj = flavors.find(f => f.title === flavor.title);
            const isSelected = flavor.title === selectedTitle;
            
            return (
              <button
                key={`${flavor.title}-${index}`}
                onClick={() => {
                  if (flavorObj) {
                    onSelect(flavorObj);
                  }
                }}
                disabled={!flavorObj}
                className={`
                  group relative rounded-lg transition-all duration-200 transform
                  ${isSelected 
                    ? 'ring-2 ring-offset-1 ring-gray-800 shadow-md scale-105' 
                    : flavorObj ? 'hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <div className={`
                  p-3 rounded-lg h-full flex flex-col items-center justify-center aspect-[3/4] relative overflow-hidden
                  ${flavor.bgColor} ${isSelected ? '' : 'opacity-95 hover:opacity-100'}
                `}>
                  {/* Can Icon */}
                  <div className="mb-2 relative z-10">
                    <div className="w-10 h-14 bg-white/40 backdrop-blur-sm rounded-md shadow-md flex items-center justify-center">
                      <div className="text-gray-800 text-center">
                        <div className="text-[7px] font-bold">LOONER</div>
                        <div className="text-[5px] mt-0.5">{(flavor as any).thc || '10mg'}</div>
                      </div>
                    </div>
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
                <p className="text-xs text-cannabis-600 mt-2">{variety.tags.find(tag => tag.includes('THC')) || '10mg THC'}</p>
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