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

  
  const recommended = allFlavors.filter(
    (f) => f.title.toLowerCase() !== (currentFlavor?.title || '').toLowerCase(),
  );

  if (recommended.length < 4) return null;

  return (
    <div className="max-w-[1180px] mx-auto">
      <h2 className="mb-10 text-center font-display capitalize text-4xl md:text-5xl font-extrabold">
        You may also like
      </h2>
      <div className="collection-group-grid scroll-mt-80 pb-10 lg:scroll-mt-32 lg:pb-[60px] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {recommended.map((flavor, index) => {
          const canImage = flavor.images[0];
          const primary = flavor.primaryColor || "#A855F7";
          const secondary = flavor.secondaryColor || "#E9D5FF";


          return (
            <div
              key={flavor.title}
              onClick={() => onSelectFlavor(flavor)}
              className="product-card relative group cursor-pointer focus:ring-2 grid h-full w-full overflow-hidden rounded-2xl"
              style={{ 
                backgroundColor: secondary,
                gridTemplateRows: 'max-content 1fr'
              }}
            >
              {/* Image Container */}
              <div className="relative w-full px-3 transition-all duration-300 ease-linear">
                {/* Desktop Hover Background - Hidden on mobile */}
                <div className="absolute inset-0 hidden lg:block">
                  {/* Colored background section that slides down on hover */}
                  <div 
                    className="absolute top-0 h-full w-full transition-all duration-300 group-hover:lg:top-3/4"
                    style={{ backgroundColor: primary }}
                  >
                    {/* Product Image in hover state */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:lg:opacity-100">
                      {canImage ? (
                        <Image
                          src={canImage}
                          alt={flavor.title}
                          width={120}
                          height={150}
                          className="h-32 w-auto object-contain drop-shadow-lg relative z-10"
                        />
                      ) : (
                        <div className="w-20 h-24 bg-white/20 rounded-lg flex items-center justify-center relative z-10">
                          <span className="text-white text-sm font-bold">LOONER</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Wavy divider */}
                    <span className="absolute -bottom-[1px] left-0 right-0 block">
                      <svg width="100%" height="12" viewBox="0 0 376 12" className="block w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M219.033 3.95355C222.099 4.65027 224.994 5.40211 227.865 6.14792C233.676 7.65728 239.392 9.14197 246.24 10.095L246.661 10.1535C249.164 10.5019 251.318 10.8018 253.286 11.049C255.489 11.302 257.673 11.5109 259.607 11.6221C262.131 11.7672 264.303 11.8489 266.279 11.8708C268.255 11.8489 270.426 11.7672 272.951 11.6221C274.884 11.5109 277.069 11.302 279.271 11.049C281.239 10.8018 283.393 10.502 285.897 10.1535L286.317 10.095C293.165 9.14196 298.881 7.6573 304.692 6.14792C307.563 5.40211 310.458 4.65027 313.525 3.95355C322.301 2.0989 332.103 0.651576 342.445 0C352.788 0.651576 362.589 2.0989 371.366 3.95355C373.011 4.3211 374.569 4.70807 376 5.10931V12H0V5.10931C1.43147 4.70807 2.98926 4.3211 4.63437 3.95355C13.4109 2.0989 23.2127 0.651576 33.5548 0C43.897 0.651576 53.6988 2.0989 62.4753 3.95355C65.5414 4.65027 68.4368 5.40211 71.3079 6.14792C77.119 7.6573 82.8349 9.14196 89.6833 10.095L90.1033 10.1535C92.6073 10.502 94.7609 10.8018 96.7292 11.049C98.9316 11.302 101.116 11.5109 103.049 11.6221C105.574 11.7672 107.745 11.8489 109.722 11.8708C111.698 11.8489 113.87 11.7672 116.394 11.6221C118.327 11.5109 120.512 11.302 122.714 11.049C124.682 10.8018 126.836 10.5019 129.34 10.1535L129.76 10.095C136.609 9.14197 142.324 7.65728 148.135 6.14792C151.006 5.40211 153.902 4.65027 156.968 3.95355C165.744 2.0989 175.546 0.651576 185.888 0C196.23 0.651576 206.032 2.0989 214.809 3.95355C216.454 4.3211 218.012 4.70807 219.443 5.10931" fill={primary}/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative m-auto flex h-auto w-4/6 flex-col lg:px-7 items-center justify-center pt-7 transition-all duration-300 ease-linear mb-3 md:mb-5 lg:mb-0 lg:h-full lg:w-full lg:pt-[54px] group-hover:lg:opacity-0">
                  <div className="px relative" style={{ width: '100%' }}>
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
                        width={120}
                        height={150}
                        className="h-20 md:h-24 w-auto object-contain drop-shadow-lg relative z-10 mx-auto"
                      />
                    ) : (
                      <div className="w-12 h-16 md:w-16 md:h-20 bg-white/20 rounded-lg flex items-center justify-center relative z-10 mx-auto">
                        <span className="text-white text-xs md:text-sm font-bold">LOONER</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Container */}
              <div className="row-span-1 row-start-2 h-full w-full p-3 lg:py-8" style={{ padding: '0px' }}>
                <div className="relative flex h-full w-full flex-col px-3 text-center transition-all duration-300 ease-in-out lg:top-7 lg:px-5 group-hover:lg:-top-7">
                  <p className="pt-3 font-display text-sm font-black leading-none text-gray-900 md:pt-0 md:text-base">
                    {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                  </p>
                  
                  {/* Desktop rating - hidden on hover */}
                  <div className="pt-[15px] hidden lg:block absolute bottom-[57px] left-1/2 -translate-x-1/2 group-hover:lg:hidden">
                    <div className="flex items-center text-gray-800">
                      <span className="text-sm">★★★★</span>
                      <span className="text-sm text-gray-400">☆</span>
                    </div>
                  </div>
                  
                  <p className="my-2 text-xs leading-normal transition-opacity duration-300 md:text-sm lg:opacity-0 group-hover:lg:opacity-100">
                    {flavor.shortDescription || flavor.description || "A boldly refreshing collision of flavors."}
                  </p>
                  
                  <div className="mt-auto flex flex-col items-center justify-between gap-y-3 pb-5 transition-opacity duration-300 lg:justify-center lg:flex-row lg:gap-y-0 lg:pb-0 lg:opacity-0 group-hover:lg:opacity-100">
                    <div className="lg:mr-2 flex w-full lg:w-auto flex-1 lg:flex-none items-center justify-center">
                      {/* Mobile rating - always visible */}
                      <div className="flex items-center text-gray-800 lg:hidden">
                        <span className="text-xs">★★★★</span>
                        <span className="text-xs text-gray-400">☆</span>
                      </div>
                      {/* Desktop hover rating */}
                      <div className="hidden lg:flex items-center text-gray-800">
                        <span className="text-sm">★★★★</span>
                        <span className="text-sm text-gray-400">☆</span>
                      </div>
                    </div>
                    
                    <div className="flex w-full lg:w-auto flex-1 lg:flex-none items-center justify-center">
                      <button className="px-3 text-xs h-7 w-full border-none rounded-[50px] bg-white text-[#0B3835] hover:bg-[#0B3835] hover:text-white focus:bg-[#0B3835] focus:text-white active:bg-[#0B3835] active:text-white flex items-center justify-center relative box-border font-medium whitespace-nowrap transition-all duration-150">
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
    </div>
  );
}
