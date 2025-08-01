import React from 'react';

interface NutritionLabelProps {
  productName?: string;
  flavorDescription?: string;
  ingredients?: string;
}

export function NutritionLabel({ 
  productName = "Sweet Orange Soda",
  flavorDescription = "That old school orange flavor, bright, sweet and crisp, now with 10mg THC.",
  ingredients = "Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), FD&C Yellow No. 6, Natural Flavors (orange oils), hemp extract"
}: NutritionLabelProps) {
  return (
    <div className="bg-white rounded-2xl border-4 border-orange-400 p-4 md:p-6 max-w-2xl mx-auto shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
        {/* Left side - Product info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-2">{productName}</h2>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">{flavorDescription}</p>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Ingredients:</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{ingredients}</p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-1">
                <span className="text-lg md:text-xl">🌿</span>
              </div>
              <span className="text-xs font-medium text-center">Plant-Derived<br />THC</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-1">
                <span className="text-lg md:text-xl">🍯</span>
              </div>
              <span className="text-xs font-medium text-center">Made with<br />Cane Sugar</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-1">
                <span className="text-lg md:text-xl font-bold">V</span>
              </div>
              <span className="text-xs font-medium text-center">Vegan</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-1">
                <span className="text-lg md:text-xl">🌾</span>
              </div>
              <span className="text-xs font-medium text-center">Gluten-Free</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center mb-1">
                <span className="text-lg md:text-xl">P</span>
              </div>
              <span className="text-xs font-medium text-center">Filtered<br />Water</span>
            </div>
          </div>
        </div>

        {/* Right side - Nutrition Facts */}
        <div className="bg-white border-2 border-black p-3 md:p-4 rounded-lg">
          <div className="text-center border-b-4 border-orange-400 pb-2 mb-3">
            <h3 className="text-lg font-bold text-orange-500">Nutrition Facts</h3>
            <p className="text-xs text-gray-600">1 Serving Per Container</p>
            <p className="text-xs text-gray-600">Serving Size: 12 fl oz (355mL)</p>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="border-b border-gray-300 pb-1 mb-2">
              <div className="font-bold">Amount Per Serving</div>
            </div>
            
            <div className="flex justify-between font-bold text-lg border-b border-gray-300 pb-1">
              <span>Calories</span>
              <span>90</span>
            </div>
            
            <div className="text-right text-xs font-bold mb-2">% Daily Value*</div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Total Fat 0g</span>
              <span className="font-bold">0%</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Sodium 10mg</span>
              <span className="font-bold">1%</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Total Carbohydrate 24g</span>
              <span className="font-bold">9%</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1 pl-4">
              <span>Dietary Fiber 0g</span>
              <span className="font-bold">0%</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1 pl-4">
              <span>Total Sugars 23g</span>
              <span className="font-bold">46%</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Protein 0g</span>
              <span className="font-bold">0%</span>
            </div>
            
            <div className="text-xs text-gray-600 mt-3 leading-tight">
              *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}