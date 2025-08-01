'use client';

import { useState } from 'react';

const FLAVORS = [
  { name: 'Half & Half', color: '#f4d03f' },
  { name: 'Peach Lemonade', color: '#f8c471' },
  { name: 'Classic Lemonade', color: '#f7dc6f' },
  { name: 'Pink Lemonade', color: '#f1948a' },
  { name: 'Mule Mocktail', color: '#95cba8' },
  { name: 'Cherry Cola', color: '#ae252f' },
];

interface FlavorSelectorProps {
  selectedFlavor?: number;
  onFlavorChange?: (index: number) => void;
}

export default function FlavorSelector({ selectedFlavor = 0, onFlavorChange }: FlavorSelectorProps) {
  const [selected, setSelected] = useState(selectedFlavor);

  const handleFlavorChange = (index: number) => {
    setSelected(index);
    onFlavorChange?.(index);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-8 text-center">Our Flavors</h3>
      
      {/* Top 4 flavors in a row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {FLAVORS.slice(0, 4).map((flavor, index) => (
          <button
            key={index}
            onClick={() => handleFlavorChange(index)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              selected === index ? 'bg-gray-100' : ''
            }`}
          >
            <div 
              className="w-12 h-12 rounded-full mb-2"
              style={{ backgroundColor: flavor.color }}
            />
            <span className="text-xs text-center leading-tight">{flavor.name}</span>
          </button>
        ))}
      </div>
      
      {/* Bottom 2 flavors centered */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {FLAVORS.slice(4, 6).map((flavor, index) => (
          <button
            key={index + 4}
            onClick={() => handleFlavorChange(index + 4)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              selected === index + 4 ? 'bg-gray-100' : ''
            }`}
          >
            <div 
              className="w-12 h-12 rounded-full mb-2"
              style={{ backgroundColor: flavor.color }}
            />
            <span className="text-xs text-center leading-tight">{flavor.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}