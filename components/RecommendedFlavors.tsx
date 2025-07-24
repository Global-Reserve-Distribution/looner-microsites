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
                className={`rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                  isHovered ? 'aspect-[3/4.2]' : 'aspect-[3/4]'
                }`}
                style={{ backgroundColor: secondary }}
              >
                {isHovered ? (
                  // Hover State Layout
                  <>
                    {/* Top Section with Decorative Background */}
                    <div 
                      className="relative flex-1 flex items-center justify-center p-6"
                      style={{ backgroundColor: primary }}
                    >
                      {/* Decorative Blob Elements */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div 
                          className="absolute top-4 left-6 w-8 h-8 rounded-full opacity-30"
                          style={{ backgroundColor: secondary }}
                        />
                        <div 
                          className="absolute top-12 right-8 w-4 h-4 rounded-full opacity-20"
                          style={{ backgroundColor: secondary }}
                        />
                        <div 
                          className="absolute bottom-12 left-4 w-6 h-6 rounded-full opacity-25"
                          style={{ backgroundColor: secondary }}
                        />
                        <div 
                          className="absolute top-6 right-4 w-12 h-6 rounded-full opacity-15"
                          style={{ backgroundColor: secondary }}
                        />
                        <div 
                          className="absolute bottom-8 right-6 w-5 h-5 rounded-full opacity-20"
                          style={{ backgroundColor: secondary }}
                        />
                      </div>
                      
                      {/* Product Image */}
                      {canImage ? (
                        <Image
                          src={canImage}
                          alt={flavor.title}
                          width={160}
                          height={200}
                          className="h-48 w-auto object-contain drop-shadow-lg relative z-10"
                        />
                      ) : (
                        <div className="w-28 h-48 bg-white/20 rounded-lg flex items-center justify-center relative z-10">
                          <span className="text-white text-base font-bold">LOONER</span>
                        </div>
                      )}
                    </div>

                    {/* Wavy Divider */}
                    <svg 
                      className="w-full h-6 -mt-1" 
                      viewBox="0 0 400 24" 
                      fill="none"
                      style={{ backgroundColor: primary }}
                    >
                      <path 
                        d="M0,12 C100,24 300,0 400,12 L400,24 L0,24 Z" 
                        fill={secondary}
                      />
                    </svg>

                    {/* Bottom Section with Content */}
                    <div 
                      className="p-6 pt-2 text-center"
                      style={{ backgroundColor: secondary }}
                    >
                      <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>
                      
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {flavor.description || "A boldly refreshing collision of flavors."}
                      </p>

                      <div className="flex items-center justify-center mb-4 text-gray-800">
                        <span className="text-sm">★★★★</span>
                        <span className="text-sm text-gray-400">☆</span>
                      </div>

                      <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                        + Add 12 Pack
                      </button>
                    </div>
                  </>
                ) : (
                  // Default State Layout
                  <>
                    {/* Product Image with Circle Background */}
                    <div className="flex-1 flex items-center justify-center mb-4 relative p-6">
                      {/* Circle Background */}
                      <div 
                        className="absolute w-36 h-36 rounded-full opacity-80"
                        style={{ backgroundColor: primary }}
                      />
                      
                      {/* Product Image */}
                      {canImage ? (
                        <Image
                          src={canImage}
                          alt={flavor.title}
                          width={160}
                          height={200}
                          className="h-44 w-auto object-contain drop-shadow-lg relative z-10"
                        />
                      ) : (
                        <div className="w-24 h-44 bg-white/20 rounded-lg flex items-center justify-center relative z-10">
                          <span className="text-white text-base font-bold">LOONER</span>
                        </div>
                      )}
                    </div>

                    {/* Product Name and Rating */}
                    <div className="px-6 pb-6 text-center">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>

                      <div className="flex items-center justify-center text-gray-800">
                        <span className="text-sm">★★★★</span>
                        <span className="text-sm text-gray-600">☆</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}