"use client";

import React from "react";

interface FlavorPickerVariantsProps {
  flavors: any[];
  selectedFlavor: any;
  onFlavorSelect: (flavor: any) => void;
  variant?: "olipop" | "premium" | "minimal" | "gradient";
}

export function FlavorPickerVariants({
  flavors,
  selectedFlavor,
  onFlavorSelect,
  variant = "olipop"
}: FlavorPickerVariantsProps) {
  const renderOlipopVariant = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex space-x-4 mb-6">
        <button className="px-6 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
          Our Flavors
        </button>
        <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
          Variety Packs
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {flavors.slice(0, 16).map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              relative aspect-square rounded-xl p-4 transition-all duration-200 
              hover:scale-105 hover:shadow-md group
              ${selectedFlavor?.title === flavor.title 
                ? 'ring-2 ring-orange-400 ring-offset-2' 
                : ''
              }
            `}
            style={{
              backgroundColor: getOlipopColor(flavor.title, index)
            }}
          >
            {/* Product Image */}
            <div className="w-full h-16 flex items-center justify-center mb-2">
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-12 h-12 object-contain drop-shadow-sm"
                />
              ) : (
                <div className="w-10 h-12 bg-white/30 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-10 bg-gradient-to-b from-white/60 to-white/40 rounded-md"></div>
                </div>
              )}
            </div>
            
            {/* Flavor Name */}
            <div className="text-center">
              <div className="text-xs font-medium text-gray-800 leading-tight">
                {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPremiumVariant = () => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Choose Your Experience
      </h3>
      
      <div className="grid grid-cols-3 gap-6">
        {flavors.slice(0, 9).map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              relative group bg-white rounded-2xl p-6 transition-all duration-300
              hover:scale-102 hover:shadow-xl border-2
              ${selectedFlavor?.title === flavor.title 
                ? 'border-green-400 shadow-lg scale-102' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {/* Gradient Background */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-10"
              style={{
                background: `linear-gradient(135deg, ${flavor.primaryColor || '#8B5CF6'}, ${flavor.secondaryColor || '#06B6D4'})`
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* THC Badge */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                10mg THC
              </div>
              
              {/* Product Image */}
              <div className="h-24 flex items-center justify-center mb-4">
                {flavor.images?.[0] ? (
                  <img
                    src={flavor.images[0]}
                    alt={flavor.title}
                    className="w-16 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-12 h-16 bg-gradient-to-b from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LOONER</span>
                  </div>
                )}
              </div>
              
              {/* Flavor Info */}
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-1 text-sm leading-tight">
                  {flavor.title.replace(/\s*-\s*\d+mg.*$/, "")}
                </h4>
                <p className="text-xs text-gray-600 mb-3">Premium Cannabis Soda</p>
                
                {/* Features */}
                <div className="flex justify-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="inline-block w-2 h-2 bg-orange-400 rounded-full"></span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMinimalVariant = () => (
    <div className="bg-white">
      <div className="grid grid-cols-5 gap-4">
        {flavors.map((flavor, index) => (
          <button
            key={flavor.title}
            onClick={() => onFlavorSelect(flavor)}
            className={`
              group relative aspect-square rounded-lg border-2 transition-all duration-200
              hover:shadow-md hover:-translate-y-1
              ${selectedFlavor?.title === flavor.title 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            {/* Selection Indicator */}
            {selectedFlavor?.title === flavor.title && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Product Image */}
            <div className="flex items-center justify-center h-2/3">
              {flavor.images?.[0] ? (
                <img
                  src={flavor.images[0]}
                  alt={flavor.title}
                  className="w-8 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
                />
              ) : (
                <div className="w-6 h-8 bg-gray-300 rounded"></div>
              )}
            </div>
            
            {/* Flavor Name */}
            <div className="px-2 pb-2">
              <p className="text-xs text-center font-medium text-gray-800 leading-tight">
                {flavor.title.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderGradientVariant = () => (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full opacity-50 translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Flavor Galaxy
        </h3>
        
        <div className="grid grid-cols-4 gap-4">
          {flavors.slice(0, 12).map((flavor, index) => (
            <button
              key={flavor.title}
              onClick={() => onFlavorSelect(flavor)}
              className={`
                relative group aspect-square rounded-2xl p-4 transition-all duration-300
                backdrop-blur-sm border border-white/30
                hover:scale-105 hover:shadow-xl hover:border-white/50
                ${selectedFlavor?.title === flavor.title 
                  ? 'scale-105 shadow-xl border-white/50 ring-2 ring-purple-400' 
                  : ''
                }
              `}
              style={{
                background: `linear-gradient(135deg, ${flavor.primaryColor || '#8B5CF6'}40, ${flavor.secondaryColor || '#06B6D4'}40)`
              }}
            >
              {/* Glassmorphism Effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                {/* Product Image */}
                <div className="flex-1 flex items-center justify-center mb-2">
                  {flavor.images?.[0] ? (
                    <img
                      src={flavor.images[0]}
                      alt={flavor.title}
                      className="w-10 h-12 object-contain drop-shadow-lg group-hover:rotate-6 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-8 h-10 bg-gradient-to-b from-white/60 to-white/40 rounded-lg shadow-lg"></div>
                  )}
                </div>
                
                {/* Flavor Name */}
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-800 leading-tight">
                    {flavor.title.replace(/\s*-\s*\d+mg.*$/, "").split(' ').slice(0, 2).join(' ')}
                  </p>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Render based on variant
  switch (variant) {
    case "olipop":
      return renderOlipopVariant();
    case "premium":
      return renderPremiumVariant();
    case "minimal":
      return renderMinimalVariant();
    case "gradient":
      return renderGradientVariant();
    default:
      return renderOlipopVariant();
  }
}

// Helper function to get Olipop-style colors
function getOlipopColor(title: string, index: number): string {
  const titleLower = title.toLowerCase();
  
  // Olipop-style color mapping
  if (titleLower.includes("grape") || titleLower.includes("wild")) return "#9CA3AF";
  if (titleLower.includes("orange") || titleLower.includes("sweet")) return "#F59E0B";
  if (titleLower.includes("pepper") || titleLower.includes("professor")) return "#7C2D12";
  if (titleLower.includes("mule") || titleLower.includes("mocktail")) return "#059669";
  if (titleLower.includes("lime") || titleLower.includes("lemon")) return "#65A30D";
  if (titleLower.includes("dew")) return "#84CC16";
  if (titleLower.includes("creme") || titleLower.includes("cream")) return "#D4A574";
  if (titleLower.includes("cola")) return "#DC2626";
  if (titleLower.includes("root") || titleLower.includes("beer")) return "#92400E";
  
  // Fallback colors
  const olipopColors = [
    "#9CA3AF", "#F59E0B", "#7C2D12", "#059669", "#65A30D",
    "#84CC16", "#D4A574", "#DC2626", "#92400E", "#6366F1",
    "#EC4899", "#8B5CF6", "#06B6D4", "#10B981"
  ];
  
  return olipopColors[index % olipopColors.length] || "#9CA3AF";
}