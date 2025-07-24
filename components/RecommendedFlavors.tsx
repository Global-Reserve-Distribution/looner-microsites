"use client";

import React, { useState, useEffect } from "react";
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
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "fadeOut" | "waveDown" | "complete"
  >("idle");

  useEffect(() => {
    if (hoveredIndex !== null) {
      setAnimationPhase("fadeOut");
      const timer1 = setTimeout(() => setAnimationPhase("waveDown"), 50);
      const timer2 = setTimeout(() => setAnimationPhase("complete"), 500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setAnimationPhase("idle");
    }
  }, [hoveredIndex]);
  const recommended = allFlavors.filter(
    (f) => f.title.toLowerCase() !== currentFlavor.toLowerCase(),
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
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-all duration-300 md:hover:scale-[1.02]"
            >
              <div
                className="rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative aspect-[3/5]"
                style={{ backgroundColor: secondary }}
              >
                {/* Always render both states, control visibility with animations */}

                {/* Default State - Shows full content on mobile, minimal on desktop */}
                <div
                  className={`absolute inset-0 ${
                    !isHovered ? "z-20" : "z-10"
                  }`}
                >
                  {/* Top Section with Product Image and Circle Background */}
                  <div 
                    className="relative flex items-center justify-center p-4"
                    style={{ 
                      backgroundColor: secondary,
                      height: '50%'
                    }}
                  >
                    {/* Circle Background */}
                    <div
                      className="absolute w-24 h-24 rounded-full"
                      style={{ backgroundColor: primary }}
                    />

                    {/* Product Image */}
                    {canImage ? (
                      <Image
                        src={canImage}
                        alt={flavor.title}
                        width={100}
                        height={120}
                        className="h-28 w-auto object-contain drop-shadow-lg relative z-10"
                      />
                    ) : (
                      <div
                        className="w-16 h-28 bg-white/20 rounded-lg flex items-center justify-center relative z-10"
                      >
                        <span className="text-white text-xs font-bold">
                          LOONER
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Section with Content - Always visible on mobile, hidden on desktop hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 text-center flex flex-col justify-center md:hidden"
                    style={{ 
                      backgroundColor: secondary,
                      height: '50%'
                    }}
                  >
                    <div className="p-3 flex flex-col justify-center h-full">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>

                      <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                        {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                      </p>

                      <div className="flex items-center justify-center mb-2 text-gray-800">
                        <span className="text-xs">★★★★</span>
                        <span className="text-xs text-gray-400">☆</span>
                      </div>

                      <button className="bg-white text-gray-800 px-3 py-1 rounded-full font-medium text-xs shadow-sm border border-gray-200">
                        + Add 12 Pack
                      </button>
                    </div>
                  </div>

                  {/* Desktop content section - always visible, matches mobile layout */}
                  <div 
                    className="hidden md:block absolute bottom-0 left-0 right-0 text-center flex flex-col justify-center"
                    style={{ 
                      backgroundColor: secondary,
                      height: '50%'
                    }}
                  >
                    <div className="p-3 flex flex-col justify-center h-full">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                        {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                      </h3>

                      <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                        {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                      </p>

                      <div className="flex items-center justify-center mb-2 text-gray-800">
                        <span className="text-xs">★★★★</span>
                        <span className="text-xs text-gray-400">☆</span>
                      </div>

                      <button className="bg-white text-gray-800 px-3 py-1 rounded-full font-medium text-xs shadow-sm border border-gray-200">
                        + Add 12 Pack
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover State - Only active on desktop */}
                <div 
                  className={`hidden md:block absolute inset-0 flex flex-col ${
                    isHovered ? "z-20" : "z-0"
                  }`}
                  style={{
                    clipPath: isHovered 
                      ? animationPhase === 'complete' 
                        ? 'inset(0% 0% 0% 0%)'
                        : animationPhase === 'waveDown'
                        ? 'inset(0% 0% 35% 0%)'
                        : 'inset(0% 0% 100% 0%)'
                      : 'inset(0% 0% 100% 0%)',
                    transition: 'clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                    {/* Top Section with Decorative Background - 40% height */}
                    <div
                      className="relative flex items-center justify-center p-6"
                      style={{ 
                        backgroundColor: primary,
                        height: '40%'
                      }}
                    >
                      {/* Decorative Blob Elements */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                      >
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

                      {/* Different Product Image for Hover State */}
                      {(flavor.images[1] || canImage) ? (
                        <Image
                          src={flavor.images[1] || canImage || ''}
                          alt={flavor.title}
                          width={160}
                          height={200}
                          className="h-48 w-auto object-contain drop-shadow-lg relative z-10"
                        />
                      ) : (
                        <div
                          className="w-28 h-48 bg-white/20 rounded-lg flex items-center justify-center relative z-10"
                        >
                          <span className="text-white text-base font-bold">
                            LOONER
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Section with Content - 60% height */}
                    <div
                      className="text-center flex flex-col justify-center absolute bottom-0 left-0 right-0"
                      style={{ 
                        height: '60%'
                      }}
                    >
                      {/* Wavy Top Border */}
                      <svg 
                        className="w-full h-6 absolute top-0 left-0" 
                        viewBox="0 0 400 24" 
                        fill="none"
                      >
                        <path 
                          d="M0,12 C100,0 300,24 400,12 L400,0 L0,0 Z" 
                          fill={secondary}
                        />
                      </svg>
                      
                      <div 
                        className="p-6 pt-8 flex flex-col justify-center h-full"
                        style={{ backgroundColor: secondary }}
                      >
                        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
                          {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                        </h3>

                        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                          {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                        </p>

                        <div className="flex items-center justify-center mb-4 text-gray-800">
                          <span className="text-sm">★★★★</span>
                          <span className="text-sm text-gray-400">☆</span>
                        </div>

                        <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
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
