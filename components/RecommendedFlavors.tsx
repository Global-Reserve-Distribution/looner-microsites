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
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'fadeOut' | 'waveDown' | 'complete'>('idle');

  useEffect(() => {
    if (hoveredIndex !== null) {
      setAnimationPhase('fadeOut');
      const timer1 = setTimeout(() => setAnimationPhase('waveDown'), 150);
      const timer2 = setTimeout(() => setAnimationPhase('complete'), 300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setAnimationPhase('idle');
    }
  }, [hoveredIndex]);
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
                className={`rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative ${
                  isHovered ? 'aspect-[3/4.2]' : 'aspect-[3/4]'
                }`}
                style={{ backgroundColor: secondary }}
              >
                {/* Always render both states, control visibility with animations */}
                
                {/* Default State - Fade out on hover */}
                <div className={`absolute inset-0 transition-all duration-200 ${
                  isHovered && animationPhase !== 'idle' ? 'opacity-0' : 'opacity-100'
                }`}>
                  {/* Product Image with Circle Background */}
                  <div className="flex-1 flex items-center justify-center mb-4 relative p-6">
                    {/* Circle Background */}
                    <div 
                      className={`absolute w-36 h-36 rounded-full transition-all duration-200 ${
                        isHovered && animationPhase !== 'idle' ? 'opacity-0 scale-110' : 'opacity-80 scale-100'
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
                        className={`h-44 w-auto object-contain drop-shadow-lg relative z-10 transition-all duration-200 ${
                          isHovered && animationPhase !== 'idle' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                        }`}
                      />
                    ) : (
                      <div className={`w-24 h-44 bg-white/20 rounded-lg flex items-center justify-center relative z-10 transition-all duration-200 ${
                        isHovered && animationPhase !== 'idle' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                      }`}>
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
                </div>

                {/* Hover State - Animate in */}
                {isHovered && (
                  <div className="absolute inset-0 flex flex-col">
                    {/* Top Section with Decorative Background */}
                    <div 
                      className="relative flex-1 flex items-center justify-center p-6"
                      style={{ backgroundColor: primary }}
                    >
                      {/* Decorative Blob Elements - Fade in */}
                      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-300 delay-200 ${
                        animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
                      }`}>
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
                      
                      {/* Product Image - Fade in */}
                      {canImage ? (
                        <Image
                          src={canImage}
                          alt={flavor.title}
                          width={160}
                          height={200}
                          className={`h-48 w-auto object-contain drop-shadow-lg relative z-10 transition-all duration-300 delay-100 ${
                            animationPhase === 'complete' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                        />
                      ) : (
                        <div className={`w-28 h-48 bg-white/20 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300 delay-100 ${
                          animationPhase === 'complete' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                          <span className="text-white text-base font-bold">LOONER</span>
                        </div>
                      )}
                    </div>

                    {/* Animated Wavy Divider */}
                    <div className="relative">
                      <svg 
                        className="w-full h-6 -mt-1" 
                        viewBox="0 0 400 24" 
                        fill="none"
                        style={{ backgroundColor: primary }}
                      >
                        <path 
                          d="M0,12 C100,24 300,0 400,12 L400,24 L0,24 Z" 
                          fill={secondary}
                          className={`transition-all duration-500 ${
                            animationPhase === 'waveDown' || animationPhase === 'complete' 
                              ? 'translate-y-0 opacity-100' 
                              : '-translate-y-full opacity-0'
                          }`}
                          style={{
                            transformOrigin: 'top',
                          }}
                        />
                      </svg>
                    </div>

                    {/* Bottom Section with Content - Slide up */}
                    <div 
                      className={`p-6 pt-2 text-center transition-all duration-400 delay-200 ${
                        animationPhase === 'complete' 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-4 opacity-0'
                      }`}
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
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}