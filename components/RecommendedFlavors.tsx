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


          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              className="cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            >
              <div
                className="rounded-2xl overflow-hidden grid h-full w-full transition-all duration-300 relative aspect-[4/5]"
                style={{ 
                  backgroundColor: secondary,
                  gridTemplateRows: 'max-content 1fr'
                }}
              >
                {/* Image Container - Top Section */}
                <div className="relative w-full px-3 transition-all duration-300">
                  <div className="relative mx-auto flex h-auto w-4/6 flex-col items-center justify-center pt-7 pb-3 md:pb-5">
                    {/* Circle Background */}
                    <div
                      className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: primary }}
                    />

                    {/* Product Image */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={80}
                        height={100}
                        className="h-20 md:h-24 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div className="w-12 h-16 md:w-16 md:h-20 bg-white/20 rounded-lg flex items-center justify-center relative z-10">
                        <span className="text-white text-xs md:text-sm font-bold">LOONER</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Container - Bottom Section */}
                <div className="row-span-1 row-start-2 h-full w-full" style={{ padding: '0px' }}>
                  <div className="relative flex h-full w-full flex-col px-3 text-center transition-all duration-300">
                    {/* Product Name */}
                    <p className="pt-2 md:pt-3 font-bold text-gray-900 text-sm md:text-base leading-none">
                      {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                    </p>

                    {/* Description */}
                    <p className="my-2 text-xs md:text-sm leading-normal text-gray-700">
                      {(flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors.").substring(0, 50)}
                      {(flavor.shortDescription || flavor.description || "").length > 50 ? "..." : ""}
                    </p>

                    {/* Bottom content with rating and button */}
                    <div className="mt-auto flex flex-col items-center justify-between gap-y-2 pb-3 md:pb-5">
                      {/* Star Rating */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center text-gray-800">
                          <span className="text-xs md:text-sm">★★★★</span>
                          <span className="text-xs md:text-sm text-gray-400">☆</span>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="flex w-full items-center justify-center">
                        <button className="px-3 text-xs h-7 w-full border-none rounded-full bg-white text-gray-800 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-800 active:text-white flex items-center justify-center relative box-border font-medium shadow-sm">
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
