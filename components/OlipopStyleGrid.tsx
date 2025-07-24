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
    <div className="space-y-6">
      {/* Top section: Main image with tags on the side */}
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

        {/* Feature Tags Container - Right column, transparent background */}
        <div className="col-span-1 h-96 flex flex-col justify-between">
          {filteredTags.slice(0, 3).map((tag: string, index: number) => (
            <div 
              key={tag}
              className="rounded-2xl p-3 text-center flex-1 flex flex-col items-center justify-center mx-4"
              style={{
                backgroundColor: selectedFlavor?.primaryColor || '#8B5CF6'
              }}
            >
              <div className="text-lg mb-1 text-white">{getTagEmoji(tag)}</div>
              <h3 className="font-bold text-white text-xs leading-tight">{tag}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section: Additional images taking full width */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div 
          className="rounded-2xl h-48 flex items-center justify-center"
          style={{
            backgroundColor: selectedFlavor?.primaryColor || '#8B5CF6'
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
        
        <div 
          className="rounded-2xl h-48 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: selectedFlavor?.secondaryColor || '#A855F7'
          }}
        >
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