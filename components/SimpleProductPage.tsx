'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { FlavorPickerVariants } from './FlavorPickerVariants';

interface SimpleProductPageProps {
  config: {
    title: string;
    subtitle?: string;
    thcAmount: string;
    productType: string;
  };
  products: any[];
}

export default function SimpleProductPage({ config, products }: SimpleProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(products?.[0]);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [quantity, setQuantity] = useState(1);

  const product = selectedFlavor || products?.[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Orange promo banner */}
      <div className="bg-orange-400 text-white text-center py-2 text-sm font-medium">
        Subscribe Today and Take 15% Off Your First Order
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Left Side - Product Image */}
          <div className="col-span-5">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/20 rounded-full"></div>
              
              {/* Product Image */}
              <div className="relative z-10">
                {product?.images?.[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-48 h-72 object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-48 h-72 bg-white/30 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">LOONER</span>
                  </div>
                )}
              </div>

              {/* Product Badge */}
              <div className="absolute bottom-4 left-4 bg-white text-orange-500 px-4 py-2 rounded-full font-bold text-sm">
                {config.thcAmount}
                <br />
                {config.productType}
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="col-span-7">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
              THC Sodas › {config.thcAmount} Sodas
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-orange-500 mb-2">{product?.title || config.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{config.subtitle}</p>

            <div className="grid grid-cols-2 gap-8">
              
              {/* Flavor Picker */}
              <div>
                <FlavorPickerVariants
                  flavors={products}
                  selectedFlavor={selectedFlavor}
                  onFlavorSelect={setSelectedFlavor}
                  variant="premium"
                />
              </div>

              {/* Purchase Options */}
              <div>
                <h3 className="text-lg font-semibold mb-4">One-Time Purchase or Subscribe?</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-xl cursor-pointer hover:border-orange-400 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="purchase"
                        value="one-time"
                        checked={purchaseType === 'one-time'}
                        onChange={(e) => setPurchaseType(e.target.value)}
                        className="mr-3 text-orange-500"
                      />
                      <div>
                        <div className="font-semibold">One-time Purchase</div>
                        <div className="text-sm text-gray-600">12 Cans <span className="font-bold text-lg">$19.99</span> <span className="line-through">$24.99</span></div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">Save 15%</div>
                  </label>

                  <label className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-xl cursor-pointer hover:border-orange-400 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="purchase"
                        value="subscription"
                        checked={purchaseType === 'subscription'}
                        onChange={(e) => setPurchaseType(e.target.value)}
                        className="mr-3 text-orange-500"
                      />
                      <div>
                        <div className="font-semibold">Subscribe & Save</div>
                        <div className="text-sm text-gray-600">12 Cans <span className="font-bold text-lg">$17.99</span> <span className="line-through">$24.99</span></div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">Save 25%</div>
                  </label>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-50 text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 min-w-12 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-50 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors">
                    Add to Cart
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Product Information</h4>
                  <p className="text-sm text-blue-700">
                    {product?.description || "Premium cannabis-infused beverage crafted with care and natural ingredients."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Facts and Features */}
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-12 mb-16">
        
        {/* Nutrition Facts */}
        <div>
          <div className="bg-white border-2 border-black p-6 rounded">
            <h3 className="font-bold text-lg mb-4 border-b-2 border-black pb-2">Nutrition Facts</h3>
            <div className="text-sm space-y-1">
              <div>1 Servings Per Container</div>
              <div className="flex justify-between">
                <span>Serving Size</span>
                <span>12 fl oz (355mL)</span>
              </div>
              <div className="border-b-4 border-black py-2 my-3">
                <div className="font-bold">Amount Per Serving</div>
              </div>
              <div className="font-bold text-lg">Calories 90</div>
              <div className="flex justify-between">
                <span>Total Fat 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between">
                <span>Sodium 10mg</span>
                <span className="font-bold">1%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Carbohydrate 24g</span>
                <span className="font-bold">9%</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>Dietary Fiber 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>Total Sugars 23g</span>
                <span className="font-bold">46%</span>
              </div>
              <div className="flex justify-between">
                <span>Protein 0g</span>
                <span className="font-bold">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div>
          <h3 className="font-bold text-xl mb-4">{product?.title || "Premium THC Beverage"}</h3>
          <p className="mb-6">
            {product?.description || "Premium cannabis-infused beverage with natural flavors and precise THC dosing."}
          </p>
          
          <h4 className="font-bold mb-2">Features:</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div>
              <div className="text-xl mb-1">🌿</div>
              <div className="text-xs">Plant-Derived THC</div>
            </div>
            <div>
              <div className="text-xl mb-1">🌾</div>
              <div className="text-xs">Made with Cane Sugar</div>
            </div>
            <div>
              <div className="text-xl mb-1">🌱</div>
              <div className="text-xs">Vegan</div>
            </div>
            <div>
              <div className="text-xl mb-1">✨</div>
              <div className="text-xs">Gluten Free</div>
            </div>
            <div>
              <div className="text-xl mb-1">💧</div>
              <div className="text-xs">Filtered Water</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="mb-4">
          <div className="text-xl font-bold mb-3">🌿 LOONER THC BEVERAGES</div>
          <button className="bg-green-600 px-6 py-2 rounded font-semibold hover:bg-green-700">
            Shop Now
          </button>
        </div>
        <div className="text-sm text-gray-400 space-y-1">
          <p>© 2025 LOONER. All rights reserved.</p>
          <p>Browse THC Beverages</p>
          <p>Premium Cannabis Beverages</p>
        </div>
      </footer>
    </div>
  );
}