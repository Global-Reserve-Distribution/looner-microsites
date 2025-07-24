"use client";

import React from "react";

interface OlipopStyleGridProps {
  selectedFlavor: any;
}

export function OlipopStyleGrid({ selectedFlavor }: OlipopStyleGridProps) {
  // Filter tags to exclude 'Soda' and 'bundle'
  const filteredTags = selectedFlavor?.tags?.filter((tag: string) => {
    const tagLower = tag.toLowerCase();
    return !tagLower.includes('soda') && !tagLower.includes('bundle');
  }) || [];

  const getTagEmoji = (tag: string): string => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('thc') || tagLower.includes('cannabis')) return '✨';
    if (tagLower.includes('cane') || tagLower.includes('sugar')) return '🌿';
    if (tagLower.includes('high') || tagLower.includes('quality')) return '⭐';
    if (tagLower.includes('fiber')) return '🌾';
    if (tagLower.includes('gmo')) return '🌱';
    if (tagLower.includes('natural')) return '🍃';
    return '✨';
  };

  const getTagBackground = (index: number): string => {
    const backgrounds = ['bg-orange-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100'];
    return backgrounds[index % backgrounds.length];
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Large Product Image Card - Takes 3 columns */}
      <div 
        className="col-span-3 rounded-3xl overflow-hidden relative h-96"
        style={{
          backgroundColor: selectedFlavor?.primaryColor || '#8B5CF6'
        }}
      >
        <div className="h-full w-full flex items-center justify-center">
          {selectedFlavor?.images?.[0] ? (
            <img
              src={selectedFlavor.images[0]}
              alt={selectedFlavor.title}
              className="w-48 h-64 object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="w-40 h-52 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-2xl font-bold">LOONER</span>
            </div>
          )}
        </div>
      </div>

      {/* Feature Tags - Right column, stacked vertically */}
      <div className="col-span-1 space-y-4">
        {filteredTags.slice(0, 3).map((tag: string, index: number) => (
          <div 
            key={tag}
            className={`${getTagBackground(index)} rounded-2xl p-4 text-center h-24 flex flex-col items-center justify-center`}
          >
            <div className="text-lg mb-1">{getTagEmoji(tag)}</div>
            <h3 className="font-bold text-gray-800 text-xs leading-tight">{tag}</h3>
          </div>
        ))}
      </div>

      {/* Additional Product Images */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="rounded-2xl h-48 flex items-center justify-center"
          style={{
            backgroundColor: selectedFlavor?.secondaryColor || '#A855F7'
          }}
        >
          {selectedFlavor?.images?.[0] && (
            <img
              src={selectedFlavor.images[0]}
              alt={selectedFlavor.title}
              className="w-20 h-28 object-contain drop-shadow-lg"
            />
          )}
        </div>
        
        <div className="rounded-2xl h-48 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center text-white">
            <h3 className="text-xl font-bold">Premium</h3>
            <p className="text-sm">Cannabis Soda</p>
          </div>
        </div>
      </div>
    </div>
  );
}