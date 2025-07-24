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
    <div className="space-y-6 pl-4">
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
                className="w-48 h-64 object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="w-40 h-52 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-2xl font-bold">LOONER</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Tags Container - Right column, secondary background */}
        <div className="h-96 flex flex-col justify-between space-y-4 py-4">
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

      {/* Bottom section: Additional images with secondary colors */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div
          className="rounded-2xl h-48 flex items-center justify-center"
          style={{
            backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
          }}
        >
          {selectedFlavor?.images?.[1] || selectedFlavor?.images?.[0] ? (
            <img
              src={selectedFlavor.images[1] || selectedFlavor.images[0]}
              alt={selectedFlavor.title}
              className="w-20 h-28 object-contain drop-shadow-lg"
            />
          ) : null}
        </div>

        <div
          className="rounded-2xl h-48 flex items-center justify-center"
          style={{
            backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
          }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
            <p className="text-sm text-gray-600">Cannabis Soda</p>
          </div>
        </div>
        
        <div
          className="rounded-2xl h-48 flex items-center justify-center"
          style={{
            backgroundColor: selectedFlavor?.secondaryColor || "#E9D5FF",
          }}
        >
          {selectedFlavor?.images?.[2] || selectedFlavor?.images?.[0] ? (
            <img
              src={selectedFlavor.images[2] || selectedFlavor.images[0]}
              alt={selectedFlavor.title}
              className="w-20 h-28 object-contain drop-shadow-lg"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
