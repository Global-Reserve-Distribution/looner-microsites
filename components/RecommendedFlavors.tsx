"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Flavor {
  title: string;
  description: string;
  images: string[];
  primaryColor: string;
  secondaryColor: string;
  tags: string[];
  variants: any[];
}

interface Props {
  allFlavors: Flavor[];
  currentFlavor: string;
  onSelectFlavor: (flavor: Flavor) => void;
}

export function RecommendedFlavors({
  allFlavors,
  currentFlavor,
  onSelectFlavor,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const recommended = allFlavors.filter(
    (f) => f.title.toLowerCase() !== currentFlavor.toLowerCase()
  );

  return (
    <section className="px-6 max-w-7xl mx-auto py-16">
      <h2 className="text-3xl font-serif text-gray-900 mb-6">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map((flavor, index) => {
          const canImage = flavor.images[0];
          const primary = flavor.primaryColor || "#A855F7";
          const secondary = flavor.secondaryColor || "#E9D5FF";
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div 
                className={`rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 ${
                  isHovered ? 'aspect-[3/4.2]' : 'aspect-[3/4]'
                }`}
                style={{ backgroundColor: secondary }}
              >
                {/* Product Image with Circle Background */}
                <div className={`flex items-center justify-center mb-4 relative transition-all duration-300 ${
                  isHovered ? 'flex-none' : 'flex-1'
                }`}>
                  {/* Circle Background */}
                  <div 
                    className={`absolute rounded-full opacity-80 transition-all duration-300 ${
                      isHovered ? 'w-44 h-44' : 'w-36 h-36'
                    }`}
                    style={{ backgroundColor: primary }}
                  />
                  
                  {/* Product Image */}
                  {canImage ? (
                    <Image
                      src={canImage}
                      alt={flavor.title}
                      width={160}
                      height={200}
                      className={`w-auto object-contain drop-shadow-lg relative z-10 transition-all duration-300 ${
                        isHovered ? 'h-48' : 'h-44'
                      }`}
                    />
                  ) : (
                    <div className={`bg-white/20 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300 ${
                      isHovered ? 'w-28 h-48' : 'w-24 h-44'
                    }`}>
                      <span className="text-white text-base font-bold">LOONER</span>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                  {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                </h3>

                {/* Product Description - Only show on hover */}
                {isHovered && (
                  <p className="text-gray-700 text-sm mb-3 px-2 leading-relaxed">
                    {flavor.description || "A modern take on the classic cannabis-infused beverage."}
                  </p>
                )}

                {/* Star Rating */}
                <div className="flex items-center text-gray-800 mb-3">
                  <span className="text-sm">★★★★</span>
                  <span className="text-sm text-gray-600">☆</span>
                </div>

                {/* Add Button - Only show on hover */}
                {isHovered && (
                  <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                    + Add 12 Pack
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}