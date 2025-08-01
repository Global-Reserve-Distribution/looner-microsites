'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../hooks/useCart';
import { AddToCart } from './cart/add-to-cart';
import { ProductProvider } from './product/product-context';

interface ProductPageProps {
  config: {
    title: string;
    subtitle?: string;
    thcAmount: string;
    productType: string;
  };
  products: any[];
}

const FLAVOR_VARIANTS = [
  { id: 'half-half', name: 'Half & Half', color: '#f4d03f' },
  { id: 'peach-lemonade', name: 'Peach Lemonade', color: '#f8c471' },
  { id: 'classic-lemonade', name: 'Classic Lemonade', color: '#f7dc6f' },
  { id: 'pink-lemonade', name: 'Pink Lemonade', color: '#f1948a' },
  { id: 'mule-mocktail', name: 'Mule Mocktail', color: '#95cba8' },
  { id: 'cherry-cola', name: 'Cherry Cola', color: '#ae252f' },
];

function ProductContent({ config, products }: ProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_VARIANTS[0]?.id || 'half-half');
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const { cart } = useCart();

  // Find the first available product
  const product = products?.[0];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-black text-white text-center py-2 text-sm">
        LOONER THC BEVERAGES + FREE SHIPPING $100+ →
      </div>
      
      {/* Cart indicator */}
      <div className="absolute top-16 right-4 text-lg">
        0
      </div>

      {/* Main Title Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">10mg Soda Products</h1>
        <p className="text-lg text-gray-600">Perfect 10mg THC soda.</p>
      </div>

      {/* Three Column Layout */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-12 mb-16">
        
        {/* Column 1: Product Image */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-8">Product</h3>
          {product?.images?.[0] && (
            <img 
              src={product.images[0].url} 
              alt={product.title}
              className="w-full max-w-xs mx-auto"
            />
          )}
          <div className="mt-4 text-sm">Image 2</div>
        </div>

        {/* Column 2: Flavors & Purchase Options */}
        <div>
          <h3 className="text-lg font-medium mb-8 text-center">Our Flavors</h3>
          
          {/* Flavor Grid - 3x2 layout exactly like PDF */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {FLAVOR_VARIANTS.slice(0, 3).map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => setSelectedFlavor(flavor.id)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  selectedFlavor === flavor.id ? 'bg-gray-100' : ''
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-full mb-2"
                  style={{ backgroundColor: flavor.color }}
                />
                <span className="text-sm text-center leading-tight">
                  {flavor.name}
                </span>
              </button>
            ))}
          </div>
          
          {/* Second row of flavors */}
          <div className="grid grid-cols-2 gap-4 mb-12 max-w-md mx-auto">
            {FLAVOR_VARIANTS.slice(3, 5).map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => setSelectedFlavor(flavor.id)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  selectedFlavor === flavor.id ? 'bg-gray-100' : ''
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-full mb-2"
                  style={{ backgroundColor: flavor.color }}
                />
                <span className="text-sm text-center leading-tight">
                  {flavor.name}
                </span>
              </button>
            ))}
          </div>

          {/* Purchase Options - Exactly like PDF */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purchaseType"
                  value="one-time"
                  checked={purchaseType === 'one-time'}
                  onChange={(e) => setPurchaseType(e.target.value as 'one-time')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">One-time Purchase</div>
                  <div className="text-sm">12 Cans <span className="font-bold">$19.99</span> <span className="line-through text-gray-500">$99</span></div>
                </div>
              </div>
              <div className="bg-yellow-300 px-3 py-1 rounded text-xs font-bold">
                Save 15%
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purchaseType"
                  value="subscription"
                  checked={purchaseType === 'subscription'}
                  onChange={(e) => setPurchaseType(e.target.value as 'subscription')}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Subscribe & Save</div>
                  <div className="text-sm">12 Cans <span className="font-bold">$17</span> <span className="line-through text-gray-500">$19.99</span></div>
                </div>
              </div>
              <div className="bg-yellow-300 px-3 py-1 rounded text-xs font-bold">
                Save 15%
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span>Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="text-center">
            {product ? (
              <div className="inline-block">
                <AddToCart product={product} />
              </div>
            ) : (
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium">
                Add to Cart - $20
              </button>
            )}
          </div>
        </div>

        {/* Column 3: Variety Packs */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-8">Variety Packs</h3>
          {/* This column appears empty in the PDF */}
        </div>
      </div>

      {/* Two Column Section Below */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 gap-12 mb-16">
        
        {/* Nutrition Facts */}
        <div>
          <div className="bg-white border-2 border-black p-6">
            <h3 className="font-bold text-xl mb-4 border-b-2 border-black pb-2">
              Nutrition Facts
            </h3>
            <div className="text-sm space-y-2">
              <div>1 Servings Per Container</div>
              <div className="flex justify-between">
                <span>Serving Size</span>
                <span>12 fl oz (355mL)</span>
              </div>
              <div className="border-b-4 border-black py-2 my-3">
                <div className="font-bold">Amount Per Serving</div>
              </div>
              <div className="font-bold text-lg">Calories 90</div>
              <div className="space-y-1">
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
                <div className="flex justify-between pl-8">
                  <span>Includes 23g Added Sugars</span>
                  <span className="font-bold">46%</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein 0g</span>
                  <span className="font-bold">0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sweet Orange Soda Description */}
        <div>
          <h3 className="font-bold text-xl mb-4">Sweet Orange Soda</h3>
          <p className="mb-6">
            That old-school orange flavor! Bright, sweet, and crisp. Now with 10mg THC.
          </p>
          
          <h4 className="font-bold mb-2">Ingredients:</h4>
          <p className="mb-8">
            Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), 
            FD&C Yellow #6, Natural Flavors, Orange Oils, Hemp Extract
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-xs">Plant-Derived THC</div>
            </div>
            <div>
              <div className="text-2xl mb-1">🌾</div>
              <div className="text-xs">Made with Cane Sugar</div>
            </div>
            <div>
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-xs">Vegan</div>
            </div>
            <div>
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs">Gluten Free</div>
            </div>
            <div>
              <div className="text-2xl mb-1">💧</div>
              <div className="text-xs">Filtered Water</div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h3 className="text-center text-2xl font-bold mb-8">You May Also Like</h3>
        <div className="grid grid-cols-4 gap-8">
          {[
            { name: 'Cola - 10mg', price: '$19.99' },
            { name: 'Creme - 10mg', price: '$19.99' },
            { name: 'Dew - 10mg', price: '$19.99' },
            { name: 'Lemon Lime 10mg', price: '$19.99' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 h-48 mb-4 rounded-lg"></div>
              <h4 className="font-medium mb-2">{item.name}</h4>
              <p className="font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <div className="mb-6">
          <div className="text-2xl font-bold mb-4">🌿 LOONER THC BEVERAGES</div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">
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

export default function NewProductPage(props: ProductPageProps) {
  return (
    <ProductProvider>
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <ProductContent {...props} />
      </Suspense>
    </ProductProvider>
  );
}