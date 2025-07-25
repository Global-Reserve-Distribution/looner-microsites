"use client";

import React, { useState } from "react";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const recommended = allFlavors.filter(
    (f) => f.title.toLowerCase() !== (currentFlavor?.title || '').toLowerCase(),
  );

  return (
    <section className="px-4 max-w-7xl mx-auto py-16">
      <h2 className="text-3xl font-serif text-gray-900 mb-6">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map((flavor, index) => {
          const canImage = flavor.images[0];
          const primary = flavor.primaryColor || "#A855F7";
          const secondary = flavor.secondaryColor || "#E9D5FF";
          const isHovered = hoveredCard === flavor.title;

          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              onMouseEnter={() => setHoveredCard(flavor.title)}
              onMouseLeave={() => setHoveredCard(null)}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div
                className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 relative aspect-[4/5] md:aspect-[4/5]"
                style={{ backgroundColor: secondary }}
              >
                {/* Default state - always visible on mobile, hover toggle on desktop */}
                <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${isHovered ? 'md:opacity-0' : 'opacity-100'}`}>
                  {/* Top Section - Responsive sizing */}
                  <div 
                    className="relative flex items-center justify-center h-24 md:h-32 p-3 md:p-4"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Circle Background */}
                    <div
                      className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full"
                      style={{ backgroundColor: primary }}
                    />

                    {/* Product Image */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={80}
                        height={100}
                        className="h-20 md:h-28 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div
                        className="w-12 h-16 md:w-16 md:h-24 bg-white/20 rounded-lg flex items-center justify-center relative z-10"
                      >
                        <span className="text-white text-xs md:text-sm font-bold">
                          LOONER
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Fixed layout with consistent sizing */}
                  <div 
                    className="flex-1 flex flex-col"
                    style={{ backgroundColor: secondary }}
                  >
                    {/* Content area with fixed spacing */}
                    <div className="px-3 md:px-4 pt-2 pb-3 flex flex-col h-full">
                      {/* Product Name - Fixed height */}
                      <div className="h-4 md:h-6 flex items-center justify-center mb-1">
                        <h3 className="font-bold text-gray-900 text-xs md:text-sm text-center leading-tight line-clamp-1">
                          {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                        </h3>
                      </div>

                      {/* Description - Fixed height */}
                      <div className="h-6 md:h-10 flex items-start justify-center mb-1">
                        <p className="text-gray-700 text-xs text-center leading-tight px-1 line-clamp-2">
                          {(flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors.").substring(0, 45)}
                          {(flavor.shortDescription || flavor.description || "").length > 45 ? "..." : ""}
                        </p>
                      </div>

                      {/* Star Rating - Fixed height */}
                      <div className="h-3 md:h-5 flex items-center justify-center mb-1">
                        <div className="flex items-center text-gray-800">
                          <span className="text-xs md:text-sm">★★★★</span>
                          <span className="text-xs md:text-sm text-gray-400">☆</span>
                        </div>
                      </div>

                      {/* Spacer to push button to bottom */}
                      <div className="flex-1 min-h-[4px]"></div>

                      {/* Button - Fixed height */}
                      <div className="h-8 md:h-8 flex items-center justify-center">
                        <button className="bg-white text-gray-800 px-2 md:px-4 py-1.5 md:py-1.5 rounded-full font-medium text-xs md:text-sm shadow-sm border border-gray-200">
                          + Add 12 Pack
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover state - desktop only */}
                <div className={`absolute inset-0 flex-col transition-opacity duration-300 hidden md:flex ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Top colored section with decorative elements */}
                  <div 
                    className="relative h-1/2 flex items-center justify-center"
                    style={{ backgroundColor: primary }}
                  >
                    {/* Decorative blob elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                      <div className="absolute top-4 right-3 w-4 h-4 bg-white/15 rounded-full"></div>
                      <div className="absolute bottom-3 left-4 w-5 h-5 bg-white/10 rounded-full"></div>
                    </div>

                    {/* Product Image */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={80}
                        height={100}
                        className="h-20 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center relative z-10">
                        <span className="text-white text-sm font-bold">LOONER</span>
                      </div>
                    )}
                  </div>

                  {/* Wavy divider */}
                  <div className="relative">
                    <svg 
                      viewBox="0 0 100 10" 
                      className="w-full h-2 fill-current text-white"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,5 Q25,0 50,5 T100,5 L100,10 L0,10 Z" />
                    </svg>
                  </div>

                  {/* Bottom content section */}
                  <div 
                    className="flex-1 p-3 flex flex-col justify-between"
                    style={{ backgroundColor: secondary }}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>
                      <p className="text-gray-700 text-xs leading-tight mb-2">
                        {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                      </p>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-sm">★★★★</span>
                        <span className="text-sm text-gray-400">☆</span>
                      </div>
                    </div>
                    <button className="bg-white text-gray-800 px-4 py-1.5 rounded-full font-medium text-sm shadow-sm border border-gray-200 w-full">
                      + Add 12 Pack
                    </button>
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
