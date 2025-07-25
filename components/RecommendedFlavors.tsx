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

      <div className="grid grid-cols-2 gap-8">
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
                className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative aspect-[4/5]"
                style={{ backgroundColor: secondary }}
              >
                {/* Compact layout structure for consistent alignment */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top Section - Enlarged for product image */}
                  <div 
                    className="relative flex items-center justify-center h-40 p-6"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Circle Background - Much Larger */}
                    <div
                      className="absolute w-32 h-32 rounded-full"
                      style={{ backgroundColor: primary }}
                    />

                    {/* Product Image - Much Larger */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={120}
                        height={150}
                        className="h-36 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div
                        className="w-24 h-32 bg-white/20 rounded-lg flex items-center justify-center relative z-10"
                      >
                        <span className="text-white text-lg font-bold">
                          LOONER
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Enlarged with better text */}
                  <div 
                    className="flex-1 flex flex-col px-6 py-4"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Product Name - Larger text */}
                    <div className="h-8 flex items-center justify-center mb-3">
                      <h3 className="font-bold text-gray-900 text-lg text-center leading-tight">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>
                    </div>

                    {/* Description - Larger text and height */}
                    <div className="h-12 flex items-start justify-center mb-4">
                      <p className="text-gray-700 text-sm text-center leading-tight px-2">
                        {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                      </p>
                    </div>

                    {/* Star Rating - Larger */}
                    <div className="h-6 flex items-center justify-center mb-4">
                      <div className="flex items-center text-gray-800">
                        <span className="text-sm">★★★★</span>
                        <span className="text-sm text-gray-400">☆</span>
                      </div>
                    </div>

                    {/* Button - Larger and more prominent */}
                    <div className="flex-1 flex items-end justify-center pb-2">
                      <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium text-sm shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                        + Add 12 Pack
                      </button>
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
