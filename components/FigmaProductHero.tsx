'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from './Header';
import { FlavorPickerVariants } from './FlavorPickerVariants';

interface FigmaProductHeroProps {
  product?: any;
  allProducts?: any[];
}

export default function FigmaProductHero({ product, allProducts = [] }: FigmaProductHeroProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(product || allProducts[0]);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative min-h-screen">
      {/* Lake Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lake-line.png')`,
          backgroundColor: '#87CEEB' // Fallback sky blue
        }}
      />
      
      {/* Orange Header Bar */}
      <div className="relative z-10 bg-orange-400 text-white text-center py-2 text-sm font-medium">
        Subscribe Today and Take 15% Off Your First Order
      </div>

      {/* Use existing Header component */}
      <div className="relative z-10">
        <Header backgroundColor="rgba(255, 255, 255, 0.95)" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
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
                  <Image
                    src={product.images[0].url}
                    alt={product.title}
                    width={200}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-48 h-72 bg-white/30 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">LOONER</span>
                  </div>
                )}
              </div>

              {/* Orange Badge */}
              <div className="absolute bottom-4 left-4 bg-white text-orange-500 px-4 py-2 rounded-full font-bold text-sm">
                Sweet
                <br />
                Orange
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="col-span-7">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
              THC Sodas › 10mg Sodas
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-orange-500 mb-2">Sweet Orange</h1>
            <p className="text-xl text-gray-600 mb-8">10mg Soda</p>

            <div className="grid grid-cols-2 gap-8">
              
              {/* Use existing FlavorPickerVariants component */}
              <div>
                <FlavorPickerVariants
                  flavors={allProducts}
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
                  <h4 className="font-semibold text-blue-900 mb-2">All the Things that Bubblicious</h4>
                  <p className="text-sm text-blue-700">
                    That old school orange flavor is both tart and sweet with 10mg THC and 
                    we make it with care super clean ingredients such as cane sugar and 
                    natural orange extract.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}