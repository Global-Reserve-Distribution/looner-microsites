'use client';

import React, { useState } from 'react';
import {
  ProductImageGallery,
  NutritionPanel, 
  IngredientIcons,
  ReviewsSummary,
  BrandStorySection,
  LocalSourcingSection,
  RelatedFlavors
} from './product-page';

interface SimpleProductPageProps {
  config: {
    title: string;
    subtitle?: string;
    thcAmount: string;
    productType: string;
  };
  products: any[];
}

const FLAVORS = [
  { name: 'Half & Half', color: '#f4d03f' },
  { name: 'Peach Lemonade', color: '#f8c471' },
  { name: 'Classic Lemonade', color: '#f7dc6f' },
  { name: 'Pink Lemonade', color: '#f1948a' },
  { name: 'Mule Mocktail', color: '#95cba8' },
  { name: 'Cherry Cola', color: '#ae252f' },
];

export default function SimpleProductPage({ config, products }: SimpleProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [quantity, setQuantity] = useState(1);

  const product = products?.[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white text-center py-2 text-sm">
        LOONER THC BEVERAGES + FREE SHIPPING $100+ →
      </div>
      
      {/* Cart */}
      <div className="absolute top-16 right-8 text-lg">0</div>

      {/* Title */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2">10mg Soda Products</h1>
        <p className="text-lg text-gray-600">Perfect 10mg THC soda.</p>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-3 gap-12 mb-16">
        
        {/* Column 1: Product Image */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-8">Product</h3>
          <div className="bg-gray-100 h-80 rounded-lg mb-4 flex items-center justify-center">
            {product?.images?.[0] ? (
              <img 
                src={product.images[0].url} 
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-gray-400">Product Image</div>
            )}
          </div>
          <div className="text-sm text-gray-500">Image 2</div>
        </div>

        {/* Column 2: Flavors & Purchase */}
        <div>
          <h3 className="text-lg font-medium mb-8 text-center">Our Flavors</h3>
          
          {/* Top 3 flavors */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {FLAVORS.slice(0, 3).map((flavor, index) => (
              <button
                key={index}
                onClick={() => setSelectedFlavor(index)}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  selectedFlavor === index ? 'bg-gray-100' : ''
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-full mb-2"
                  style={{ backgroundColor: flavor.color }}
                />
                <span className="text-xs text-center">{flavor.name}</span>
              </button>
            ))}
          </div>
          
          {/* Bottom 3 flavors */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {FLAVORS.slice(3, 6).map((flavor, index) => (
              <button
                key={index + 3}
                onClick={() => setSelectedFlavor(index + 3)}
                className={`flex flex-col items-center p-3 rounded-lg ${
                  selectedFlavor === index + 3 ? 'bg-gray-100' : ''
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-full mb-2"
                  style={{ backgroundColor: flavor.color }}
                />
                <span className="text-xs text-center">{flavor.name}</span>
              </button>
            ))}
          </div>

          {/* Purchase Options */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purchase"
                  value="one-time"
                  checked={purchaseType === 'one-time'}
                  onChange={(e) => setPurchaseType(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">One-time Purchase</div>
                  <div className="text-sm">12 Cans <span className="font-bold">$19.99</span> <span className="line-through text-gray-500">$99</span></div>
                </div>
              </div>
              <div className="bg-yellow-300 px-2 py-1 rounded text-xs font-bold">Save 15%</div>
            </label>

            <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="purchase"
                  value="subscription"
                  checked={purchaseType === 'subscription'}
                  onChange={(e) => setPurchaseType(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Subscribe & Save</div>
                  <div className="text-sm">12 Cans <span className="font-bold">$17</span> <span className="line-through text-gray-500">$19.99</span></div>
                </div>
              </div>
              <div className="bg-yellow-300 px-2 py-1 rounded text-xs font-bold">Save 15%</div>
            </label>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span>Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="text-center">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800">
              Add to Cart - $20
            </button>
          </div>
        </div>

        {/* Column 3: Variety Packs */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-8">Variety Packs</h3>
        </div>
      </div>

      {/* Bottom Two Columns */}
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

        {/* Product Description */}
        <div>
          <h3 className="font-bold text-xl mb-4">Sweet Orange Soda</h3>
          <p className="mb-6">
            That old-school orange flavor! Bright, sweet, and crisp. Now with 10mg THC.
          </p>
          
          <h4 className="font-bold mb-2">Ingredients:</h4>
          <p className="mb-8 text-sm">
            Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), 
            FD&C Yellow #6, Natural Flavors, Orange Oils, Hemp Extract
          </p>

          {/* Feature Icons */}
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

      {/* Figma-Based Sections */}
      
      {/* Lifestyle Images */}
      <ProductImageGallery 
        images={[
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313",
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336"
        ]}
      />

      {/* Ingredient Icons */}
      <IngredientIcons 
        icons={[
          { label: "Plant-Based", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292" },
          { label: "Low Sugar", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313" },
          { label: "No Gluten", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336" }
        ]}
      />

      {/* Customer Reviews */}
      <ReviewsSummary 
        reviews={[
          { name: "Taylor", rating: 5, quote: "Obsessed with this flavor. Perfect balance of THC and taste!" },
          { name: "Alex", rating: 4, quote: "Refreshing and light. Great for social occasions." },
          { name: "Jordan", rating: 5, quote: "Best cannabis beverage I've tried. Will definitely reorder." },
          { name: "Casey", rating: 4, quote: "Love the natural ingredients. Clean buzz without the crash." }
        ]}
        averageRating={4.9}
      />

      {/* Brand Story */}
      <BrandStorySection />

      {/* Local Sourcing */}
      <LocalSourcingSection 
        images={[
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313", 
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336",
          "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292"
        ]}
      />

      {/* Related Flavors */}
      <RelatedFlavors 
        products={[
          { 
            name: "Sweet Orange", 
            slug: "sweet-orange", 
            image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292" 
          },
          { 
            name: "Lime Mint", 
            slug: "lime-mint", 
            image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313" 
          },
          { 
            name: "Cherry Cola", 
            slug: "cherry-cola", 
            image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336" 
          }
        ]}
      />

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