"use client";

import React from "react";
import Image from "next/image";

interface Flavor {
  title: string;
  description: string;
  shortDescription?: string;
  images: string[];
  primaryColor: string;
  secondaryColor: string;
  tags: string[];
  variants: any[];
}

interface Props {
  allFlavors: Flavor[];
  currentFlavor: Flavor | null;
  onSelectFlavor: (flavor: Flavor) => void;
}

export function RecommendedFlavors({
  allFlavors,
  currentFlavor,
  onSelectFlavor,
}: Props) {
  // Removed hover states for consistent display
  const recommended = allFlavors.filter(
    (f) => f.title.toLowerCase() !== (currentFlavor?.title || '').toLowerCase(),
  );

  return (
    <section className="px-4 max-w-7xl mx-auto py-16">
      <h2 className="text-3xl font-serif text-gray-900 mb-6">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map((flavor, index) => {
          const canImage = flavor.images[0];
          const primary = flavor.primaryColor || "#A855F7";
          const secondary = flavor.secondaryColor || "#E9D5FF";

          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div
                className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative aspect-[3/4]"
                style={{ backgroundColor: secondary }}
              >
                {/* Compact layout structure for consistent alignment */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top Section - Compact height for product image */}
                  <div 
                    className="relative flex items-center justify-center h-24 p-3"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Circle Background */}
                    <div
                      className="absolute w-16 h-16 rounded-full"
                      style={{ backgroundColor: primary }}
                    />

                    {/* Product Image */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={60}
                        height={75}
                        className="h-20 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div
                        className="w-12 h-20 bg-white/20 rounded-lg flex items-center justify-center relative z-10"
                      >
                        <span className="text-white text-xs font-bold">
                          LOONER
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Fixed layout with consistent spacing */}
                  <div 
                    className="flex-1 flex flex-col"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Fixed content area with exact positioning */}
                    <div className="p-3 flex flex-col h-full">
                      {/* Product Name - Fixed position */}
                      <div className="h-6 flex items-center justify-center">
                        <h3 className="font-bold text-gray-900 text-xs text-center leading-tight line-clamp-1">
                          {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                        </h3>
                      </div>

                      {/* Description - Fixed height with line clamping */}
                      <div className="h-10 flex items-start justify-center overflow-hidden">
                        <p className="text-gray-700 text-xs text-center leading-[1.3] px-1 line-clamp-2">
                          {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                        </p>
                      </div>

                      {/* Star Rating - Fixed position */}
                      <div className="h-5 flex items-center justify-center">
                        <div className="flex items-center text-gray-800">
                          <span className="text-xs">★★★★</span>
                          <span className="text-xs text-gray-400">☆</span>
                        </div>
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1"></div>

                      {/* Button - Always at bottom */}
                      <div className="h-8 flex items-center justify-center">
                        <button className="bg-white text-gray-800 px-3 py-1 rounded-full font-medium text-xs shadow-sm border border-gray-200">
                          + Add 12 Pack
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
