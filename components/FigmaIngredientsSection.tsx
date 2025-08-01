"use client";

import React from 'react';

export default function FigmaIngredientsSection() {
  return (
    <div className="w-[1425px] h-[693px] flex-shrink-0">
      <div className="w-[1425px] h-[693px] bg-[#b2fffb] flex-shrink-0 relative">
        {/* Main container with centered white rounded rectangle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1184px] h-[599px] bg-[#fffefd] border-[5px] border-[#ffa13c] rounded-[50px] flex">
          
          {/* Left side - Feature badges */}
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="flex items-start gap-2 w-[1012px] h-[108px] pr-[38px]">
              {/* Plant-Derived THC */}
              <div className="flex flex-col flex-grow justify-end items-center gap-[14px] px-4">
                <span className="text-[#14433d] text-center font-inter text-[16.6px] font-bold leading-[20px]">
                  Plant-Derived THC
                </span>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
              </div>
              
              {/* Made with Cane Sugar */}
              <div className="flex flex-col flex-grow justify-end items-center gap-[14px] px-4">
                <span className="text-[#14433d] text-center font-inter text-[16.6px] font-bold leading-[20px]">
                  Made with Cane Sugar
                </span>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
              </div>
              
              {/* Vegan */}
              <div className="flex flex-col flex-grow justify-center items-center gap-[20px] px-4">
                <span className="text-[#14433d] text-center font-inter text-[16.6px] font-bold leading-[28px]">
                  Vegan
                </span>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
              </div>
              
              {/* Gluten-Free */}
              <div className="flex flex-col flex-grow justify-center items-center gap-[20px] px-4">
                <span className="text-[#14433d] text-center font-inter text-[16.6px] font-bold leading-[28px]">
                  Gluten-Free
                </span>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
              </div>
              
              {/* Filtered Water */}
              <div className="flex flex-col flex-grow justify-end items-center gap-[14px] px-4">
                <span className="text-[#14433d] text-center font-inter text-[16.6px] font-bold leading-[20px]">
                  Filtered Water
                </span>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Middle - Nutrition Facts */}
          <div className="w-[250px] h-[397px] flex flex-col items-start">
            <div className="w-[250px] h-[369px] border border-[#ffa13c] overflow-hidden">
              {/* Nutrition Facts Header */}
              <div className="w-[240px] border-b-[10px] border-[#ffa13c] flex flex-col items-start pb-4">
                <div className="border-b border-[#ffa13c] flex items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[29.4px] font-black leading-[28px]">
                    Nutrition Facts
                  </span>
                </div>
                <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px] px-2">
                  2 servings per container
                </span>
                <div className="flex items-start gap-[62px] w-[181px] h-[21px] px-2">
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    Serving size
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    6 fl oz (355mL)
                  </span>
                </div>
              </div>

              {/* Nutrition Table */}
              <div className="w-[240px] flex flex-col items-start gap-[0.5px]">
                <span className="text-[#ffa13c] font-inter text-[11.8px] font-bold leading-[16px] px-2">
                  Amount per serving
                </span>
                
                {/* Calories */}
                <div className="w-[240px] border-b-[7px] border-[#ffa13c] flex items-start gap-[78px] px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[29.4px] font-black leading-[28px]">
                    Calories
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[29.4px] font-black leading-[28px]">
                    90
                  </span>
                </div>

                {/* Daily Value */}
                <span className="text-[#ffa13c] font-inter text-[11.8px] font-bold leading-[16px] px-2">
                  % Daily Value*
                </span>

                {/* Nutrition rows */}
                <div className="w-[240px] border-t border-[#ffa13c] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Total Fat 0g
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    0%
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Sodium 10mg
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    1%
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Total Carbohydrate 24g
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    9%
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Dietary Fiber 0g
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    32%
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Total Sugars 23g
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px] pl-4">
                    Includes 23g Added Sugars
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    46%
                  </span>
                </div>

                <div className="w-[240px] border-t border-[#ffa13c] border-b-[10px] flex justify-between items-center px-2 py-1">
                  <span className="text-[#ffa13c] font-inter text-[13px] font-normal leading-[20px]">
                    Protein 0g
                  </span>
                  <span className="text-[#ffa13c] font-inter text-[13.7px] font-bold leading-[20px]">
                    0%
                  </span>
                </div>

                {/* Footer */}
                <div className="w-[240px] px-2 py-2">
                  <span className="text-[#ffa13c] font-inter text-[11.1px] font-normal leading-[15px]">
                    Not a significant source of saturated fat, trans fat, cholesterol, vitamin D, calcium, iron, potassium and vitamin A.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Product description */}
          <div className="w-[630px] h-[460px] flex flex-col justify-center px-8">
            <span className="text-[#ffa13c] font-kantumruy text-[44.2px] font-bold leading-[48px] mb-6">
              Sweet Orange Soda
            </span>
            
            <div className="flex flex-col items-start w-[630px] h-[84px] mb-8">
              <span className="text-[#ffa13c] font-inter text-[17px] font-normal leading-[28px]">
                That old school orange flavor, bright, sweet and crisp, now with 10mg THC.
              </span>
            </div>

            <div className="flex flex-col items-start w-[630px] h-[140px]">
              <span className="text-[#ffa13c] font-inter text-[17.3px] font-normal leading-[28px]">
                <span className="font-bold">Ingredients:</span> Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), FD&C Yellow #6, Natural Flavors (orange oils), hemp extract
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}