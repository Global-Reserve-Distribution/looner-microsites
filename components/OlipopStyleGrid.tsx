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
      {/* Desktop Layout */}
      <div className="hidden md:block space-y-6 pl-4">
        {/* Top section: Main image with tags on the side */}
        <div className="grid grid-cols-[3fr_1fr] gap-4">
          {/* Large Product Image Card */}
          <div
            className="rounded-3xl overflow-hidden relative h-96"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            <div className="h-full w-full flex items-center justify-center">
              {selectedFlavor?.images?.[0] ? (
                <img
                  src={selectedFlavor.images[0]}
                  alt={selectedFlavor.title}
                  className="w-75 object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-40 h-52 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-2xl font-bold">LOONER</span>
                </div>
              )}
            </div>
          </div>

          {/* Feature Tags Container - Right column, secondary background */}
          <div className="h-96 flex flex-col justify-between space-y-4">
            {filteredTags.slice(0, 3).map((tag: string, index: number) => (
              <div
                key={tag}
                className="rounded-2xl p-4 text-center flex-1 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
                }}
              >
                <div className="text-2xl mb-1">{getTagEmoji(tag)}</div>
                <h3 className="font-bold text-gray-800 text-sm leading-tight">
                  {tag}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Middle section: Full-width card with multiple products */}
        <div className="w-full">
          <div
            className="rounded-2xl h-56 flex items-center justify-center gap-8 px-8"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            {/* Three product cans arranged horizontally */}
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center justify-center">
                {selectedFlavor?.images?.[0] ? (
                  <img
                    src={selectedFlavor.images[0]}
                    alt={selectedFlavor.title}
                    className="w-16 h-20 object-contain drop-shadow-lg transform rotate-12"
                    style={{
                      transform: `rotate(${index === 1 ? "0deg" : index === 0 ? "-12deg" : "12deg"})`,
                    }}
                  />
                ) : (
                  <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">LOONER</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section: Two half-width cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div
            className="rounded-2xl h-64 flex items-center justify-center"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">Better than</h3>
              <h3 className="text-4xl font-bold text-white">Dessert</h3>
            </div>
          </div>

          <div
            className="rounded-2xl h-64 flex items-center justify-center relative overflow-hidden"
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

      {/* Mobile Carousel Layout */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {/* Main product card */}
          <div
            className="flex-shrink-0 w-80 rounded-2xl h-80 flex items-center justify-center"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
            }}
          >
            {selectedFlavor?.images?.[0] ? (
              <img
                src={selectedFlavor.images[0]}
                alt={selectedFlavor.title}
                className="w-32 h-48 object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-white">
                  LOONER
                </div>
                <div className="text-lg text-white/80">
                  Cannabis Co.
                </div>
              </div>
            )}
          </div>

          {/* Tag cards */}
          {filteredTags.slice(0, 3).map((tag: string, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 rounded-2xl h-80 flex items-center justify-center"
              style={{
                backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">
                  {getTagEmoji(tag)}
                </div>
                <div className="text-gray-800 font-bold text-base">
                  {tag}
                </div>
              </div>
            </div>
          ))}

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
