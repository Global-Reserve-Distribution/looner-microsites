"use client";

import React from "react";

interface OlipopStyleGridProps {
  selectedFlavor: any;
}

export function OlipopStyleGrid({ selectedFlavor }: OlipopStyleGridProps) {
  // Filter tags to exclude 'Soda' and 'bundle'
  const filteredTags =
    selectedFlavor?.tags?.filter((tag: string) => {
      const tagLower = tag.toLowerCase();
      return !tagLower.includes("soda") && !tagLower.includes("bundle");
    }) || [];

  const getTagEmoji = (tag: string): string => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("thc") || tagLower.includes("cannabis")) return "✨";
    if (tagLower.includes("cane") || tagLower.includes("sugar")) return "🌿";
    if (tagLower.includes("high") || tagLower.includes("quality")) return "⭐";
    if (tagLower.includes("fiber")) return "🌾";
    if (tagLower.includes("gmo")) return "🌱";
    if (tagLower.includes("natural")) return "🍃";
    return "✨";
  };

  return (
    <div>
      {/* Desktop Layout - Based on Figma Design */}
      <div className="hidden md:block w-full space-y-5">
        {/* Top Section: Featured Block with Product and Badges */}
        <div className="grid grid-cols-[442fr_160fr] gap-5 h-[400px]">
          {/* Main Product Display */}
          <div className="rounded-2xl relative flex items-center justify-center"
               style={{ backgroundColor: "#ffbd4e" }}>
            {/* Best Seller Tag */}
            {selectedFlavor?.showBestSellerTag && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase shadow-lg">
                  Bestseller
                </div>
              </div>
            )}
            <div className="flex items-center justify-center p-6">
              {selectedFlavor?.images?.[0] ? (
                <img
                  src={selectedFlavor.images[0]}
                  alt={selectedFlavor.title}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="text-white text-3xl font-bold">LOONER</div>
              )}
            </div>
          </div>

          {/* Feature Badges Column */}
          <div className="flex flex-col gap-5">
            {/* 10mg THC Badge */}
            <div className="flex-1 rounded-2xl flex items-center justify-center"
                 style={{ backgroundColor: "#faa81e" }}>
              <span className="text-white text-center font-bold text-lg leading-tight">
                10mg<br />THC
              </span>
            </div>

            {/* Made with Cane Sugar Badge */}
            <div className="flex-1 rounded-2xl flex items-center justify-center"
                 style={{ backgroundColor: "#faa81e" }}>
              <span className="text-white text-center font-bold text-lg leading-tight">
                Made with<br />Cane Sugar
              </span>
            </div>

            {/* Gluten Free Badge */}
            <div className="flex-1 rounded-2xl flex items-center justify-center"
                 style={{ backgroundColor: "#faa81e" }}>
              <span className="text-white text-center font-bold text-lg leading-tight">
                Gluten<br />Free
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Video */}
        <div className="w-full aspect-[622/353] rounded-2xl bg-gray-300 overflow-hidden flex items-center justify-center"
             style={{ backgroundColor: selectedFlavor?.secondaryColor || "#d3d3d3" }}>
          <div className="text-white text-2xl font-bold">Video Coming Soon</div>
        </div>

        {/* Bottom Section: Two image cards */}
        <div className="grid grid-cols-2 gap-5">
          <div className="aspect-square rounded-2xl bg-gray-300 overflow-hidden flex items-center justify-center"
               style={{ backgroundColor: selectedFlavor?.secondaryColor || "#d3d3d3" }}>
            {selectedFlavor?.images?.[0] ? (
              <img
                src={selectedFlavor.images[0]}
                alt={selectedFlavor.title}
                className="w-3/4 h-3/4 object-contain drop-shadow-xl"
              />
            ) : (
              <div className="text-white text-xl font-bold">LOONER</div>
            )}
          </div>
          <div className="aspect-square rounded-2xl bg-gray-300 overflow-hidden flex items-center justify-center"
               style={{ backgroundColor: selectedFlavor?.secondaryColor || "#d3d3d3" }}>
            {selectedFlavor?.images?.[0] ? (
              <img
                src={selectedFlavor.images[0]}
                alt={selectedFlavor.title}
                className="w-3/4 h-3/4 object-contain drop-shadow-xl transform rotate-12"
              />
            ) : (
              <div className="text-white text-xl font-bold">LOONER</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Carousel Layout */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {/* First card: Main product image with tags combined */}
          <div className="flex-shrink-0 w-80">
            <div className="grid grid-rows-[1fr_auto] gap-3 h-80">
              {/* Large Product Image - Top section */}
              <div
                className="rounded-2xl flex items-center justify-center relative"
                style={{
                  backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
                }}
              >
                {/* Best Seller Tag */}
                {selectedFlavor?.showBestSellerTag && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs uppercase shadow-lg">
                      Bestseller
                    </div>
                  </div>
                )}
                {selectedFlavor?.images?.[0] ? (
                  <img
                    src={selectedFlavor.images[0]}
                    alt={selectedFlavor.title}
                    className="w-28 h-40 object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1 text-white">
                      LOONER
                    </div>
                    <div className="text-sm text-white/80">
                      Cannabis Co.
                    </div>
                  </div>
                )}
              </div>
              
              {/* Tag cards - Bottom section in grid */}
              <div className="grid grid-cols-3 gap-2 h-20">
                {filteredTags.slice(0, 3).map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl flex flex-col items-center justify-center text-center p-2"
                    style={{
                      backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
                    }}
                  >
                    <div className="text-lg mb-1">{getTagEmoji(tag)}</div>
                    <div className="text-gray-800 font-semibold text-xs leading-tight">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multiple products card */}
          <div
            className="flex-shrink-0 w-80 rounded-2xl h-80 flex items-center justify-center gap-4 px-6"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center justify-center">
                {selectedFlavor?.images?.[0] ? (
                  <img
                    src={selectedFlavor.images[0]}
                    alt={selectedFlavor.title}
                    className="w-12 h-16 object-contain drop-shadow-lg"
                    style={{
                      transform: `rotate(${index === 1 ? "0deg" : index === 0 ? "-12deg" : "12deg"})`,
                    }}
                  />
                ) : (
                  <div className="w-12 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">LOONER</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Better than Dessert card */}
          <div
            className="flex-shrink-0 w-64 rounded-2xl h-80 flex items-center justify-center"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">Better than</h3>
              <h3 className="text-3xl font-bold text-white">Dessert</h3>
            </div>
          </div>

          {/* Glass product card */}
          <div
            className="flex-shrink-0 w-64 rounded-2xl h-80 flex items-center justify-center"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            <div className="flex items-center gap-4">
              {/* Glass with liquid */}
              <div className="w-12 h-20 bg-white/30 rounded-lg flex items-end">
                <div
                  className="w-full h-3/4 rounded-b-lg"
                  style={{
                    backgroundColor: selectedFlavor?.primaryColor || "#8B5CF6",
                    opacity: 0.7,
                  }}
                ></div>
              </div>
              {/* Product can */}
              {selectedFlavor?.images?.[0] && (
                <img
                  src={selectedFlavor.images[0]}
                  alt={selectedFlavor.title}
                  className="w-16 h-20 object-contain drop-shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
