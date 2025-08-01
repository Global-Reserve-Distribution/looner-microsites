"use client";

import React from 'react';

export default function FigmaIngredientsSection() {
  return (
    <div className="w-full max-w-[1425px] mx-auto px-4 py-12">
      <div className="w-full flex-shrink-0 relative flex justify-center">
        {/* Main container with centered white rounded rectangle */}
        <div className="w-full max-w-[1184px] min-h-[400px] bg-[#fffefd] border-[5px] border-[#ffa13c] rounded-[50px] flex flex-col lg:flex-row gap-6 p-6 lg:p-8">
          
          {/* Top - Feature badges */}
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {/* Plant-Derived THC */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                <span className="text-[#14433d] text-center font-inter text-[14px] lg:text-[16.6px] font-bold leading-[20px]">
                  Plant-Derived THC
                </span>
              </div>
              
              {/* Made with Cane Sugar */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                <span className="text-[#14433d] text-center font-inter text-[14px] lg:text-[16.6px] font-bold leading-[20px]">
                  Made with Cane Sugar
                </span>
              </div>
              
              {/* Vegan */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                <span className="text-[#14433d] text-center font-inter text-[14px] lg:text-[16.6px] font-bold leading-[28px]">
                  Vegan
                </span>
              </div>
              
              {/* Gluten-Free */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                <span className="text-[#14433d] text-center font-inter text-[14px] lg:text-[16.6px] font-bold leading-[28px]">
                  Gluten-Free
                </span>
              </div>
              
              {/* Filtered Water */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                <span className="text-[#14433d] text-center font-inter text-[14px] lg:text-[16.6px] font-bold leading-[20px]">
                  Filtered Water
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section - Layout with Nutrition Facts and Product Info */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Nutrition Facts */}
            <div className="w-full lg:w-[280px] flex-shrink-0">
              <div className="w-full border border-[#ffa13c] bg-white rounded-lg overflow-hidden">
                {/* Nutrition Facts Header */}
                <div className="w-full border-b-[8px] border-[#ffa13c] flex flex-col items-start pb-3">
                  <div className="border-b border-[#ffa13c] w-full flex items-center px-3 py-2">
                    <span className="text-[#ffa13c] font-inter text-[24px] lg:text-[29.4px] font-black leading-[28px]">
                      Nutrition Facts
                    </span>
                  </div>
                  <span className="text-[#ffa13c] font-inter text-[12px] lg:text-[13px] font-normal leading-[20px] px-3">
                    2 servings per container
                  </span>
                  <div className="flex justify-between w-full px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[12px] lg:text-[13.7px] font-bold leading-[20px]">
                      Serving size
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[12px] lg:text-[13.7px] font-bold leading-[20px]">
                      12 fl oz (355mL)
                    </span>
                  </div>
                </div>

                {/* Nutrition Table */}
                <div className="w-full flex flex-col items-start">
                  <span className="text-[#ffa13c] font-inter text-[10px] lg:text-[11.8px] font-bold leading-[16px] px-3 py-1">
                    Amount per serving
                  </span>
                  
                  {/* Calories */}
                  <div className="w-full border-b-[6px] border-[#ffa13c] flex justify-between items-center px-3 py-2">
                    <span className="text-[#ffa13c] font-inter text-[24px] lg:text-[29.4px] font-black leading-[28px]">
                      Calories
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[24px] lg:text-[29.4px] font-black leading-[28px]">
                      90
                    </span>
                  </div>

                  {/* Daily Value */}
                  <span className="text-[#ffa13c] font-inter text-[10px] lg:text-[11.8px] font-bold leading-[16px] px-3 py-1">
                    % Daily Value*
                  </span>

                  {/* Nutrition rows */}
                  <div className="w-full border-t border-[#ffa13c] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                      Total Fat 0g
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      0%
                    </span>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                      Sodium 10mg
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      1%
                    </span>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                      Total Carbohydrate 24g
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      9%
                    </span>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] px-3 py-1">
                    <div className="flex justify-between">
                      <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                        Total Sugars 23g
                      </span>
                    </div>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px] pl-4">
                      Includes 23g Added Sugars
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      46%
                    </span>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                      Dietary Fiber 0g
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      0%
                    </span>
                  </div>

                  <div className="w-full border-t border-[#ffa13c] border-b-[6px] flex justify-between items-center px-3 py-1">
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13px] font-normal leading-[20px]">
                      Protein 0g
                    </span>
                    <span className="text-[#ffa13c] font-inter text-[11px] lg:text-[13.7px] font-bold leading-[20px]">
                      0%
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="w-full px-3 py-2">
                    <span className="text-[#ffa13c] font-inter text-[9px] lg:text-[11.1px] font-normal leading-[15px]">
                      Not a significant source of saturated fat, trans fat, cholesterol, vitamin D, calcium, iron, potassium and vitamin A.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product description */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#ffa13c] font-bold text-[28px] lg:text-[44.2px] leading-[32px] lg:leading-[48px] mb-4 lg:mb-6">
                Sweet Orange Soda
              </h2>
              
              <div className="mb-6 lg:mb-8">
                <p className="text-[#ffa13c] font-inter text-[14px] lg:text-[17px] font-normal leading-[24px] lg:leading-[28px]">
                  That old school orange flavor, bright, sweet and crisp, now with 10mg THC.
                </p>
              </div>

              <div>
                <p className="text-[#ffa13c] font-inter text-[12px] lg:text-[17.3px] font-normal leading-[20px] lg:leading-[28px]">
                  <span className="font-bold">Ingredients:</span> Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), FD&C Yellow #6, Natural Flavors (orange oils), hemp extract
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}