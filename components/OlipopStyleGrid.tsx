"use client";

import React from "react";

interface OlipopStyleGridProps {
  selectedFlavor: any;
}

export function OlipopStyleGrid({ selectedFlavor }: OlipopStyleGridProps) {
  return (
    <div className="space-y-6">
      {/* Large Product Image Card */}
      <div 
        className="rounded-3xl overflow-hidden relative h-96"
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

      {/* Feature Tags Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-100 rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-bold text-gray-800">10mg THC</h3>
        </div>
        
        <div className="bg-green-100 rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">🌿</div>
          <h3 className="font-bold text-gray-800">Cane Sugar</h3>
        </div>
        
        <div className="bg-blue-100 rounded-2xl p-4 text-center">
          <div className="text-xl mb-1">⭐</div>
          <h3 className="font-bold text-gray-800 text-sm">High Quality</h3>
        </div>
        
        <div className="bg-purple-100 rounded-2xl p-4 text-center">
          <div className="text-xl mb-1">🥤</div>
          <h3 className="font-bold text-gray-800 text-sm">Soda</h3>
        </div>
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