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

          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <div 
                className="rounded-3xl p-6 flex flex-col items-center text-center aspect-[3/4]"
                style={{ backgroundColor: secondary }}
              >
                {/* Product Image with Circle Background */}
                <div className="flex-1 flex items-center justify-center mb-4 relative">
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

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                  {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center text-gray-800">
                  <span className="text-sm">★★★★</span>
                  <span className="text-sm text-gray-600">☆</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}