'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from './Header';
import { FlavorPickerVariants } from './FlavorPickerVariants';
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

export default function SimpleProductPage({ config, products }: SimpleProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(products?.[0]);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [quantity, setQuantity] = useState(1);

  const product = selectedFlavor || products?.[0];

  return (
    <div className="min-h-screen">
      {/* Figma-style Hero Section */}
      <div className="relative min-h-screen">
        {/* Lake Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lake-line.png')`,
            backgroundColor: '#87CEEB'
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
              <h1 className="text-5xl font-bold text-orange-500 mb-2">{config.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{config.subtitle}</p>

              <div className="grid grid-cols-2 gap-8">
                
                {/* Use existing FlavorPickerVariants component */}
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
                    <h4 className="font-semibold text-blue-900 mb-2">All the Things that Bubblicious</h4>
                    <p className="text-sm text-blue-700">
                      Premium cannabis-infused beverages made with care using super clean ingredients 
                      such as cane sugar and natural extracts. Perfect {config.thcAmount} dosage for the ideal experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Figma Components Section */}
      <div className="bg-white">
        {/* Product Image Gallery */}
        <ProductImageGallery 
          images={[
            product?.images?.[0]?.url || "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
            product?.images?.[1]?.url || "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313",
            product?.images?.[2]?.url || "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336"
          ]}
        />
        
        {/* Ingredient Icons */}
        <IngredientIcons 
          icons={[
            { label: "Plant-Based", icon: "🌿" },
            { label: "Low Sugar", icon: "🍃" },
            { label: "No Gluten", icon: "✨" }
          ]}
        />
        
        {/* Reviews Summary */}
        <ReviewsSummary 
          reviews={[
            { name: "Taylor", rating: 5, quote: "Obsessed with this flavor. Perfect balance of THC and taste!" },
            { name: "Alex", rating: 4, quote: "Refreshing and light. Great for social occasions." },
            { name: "Jordan", rating: 5, quote: "Best cannabis beverage I've tried. Will definitely reorder." },
            { name: "Casey", rating: 4, quote: "Love the natural ingredients. Clean buzz without the crash." }
          ]}
          averageRating={4.9}
        />
        
        {/* Brand Story Section */}
        <BrandStorySection />
        
        {/* Local Sourcing Section */}
        <LocalSourcingSection 
          images={[
            "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
            "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313", 
            "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336",
            product?.images?.[0]?.url || "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292"
          ]}
        />
        
        {/* Related Flavors */}
        <RelatedFlavors 
          products={products.slice(0, 3).map((p, i) => ({
            name: p.title,
            slug: p.handle,
            image: p.images?.[0]?.url || `https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292`
          }))}
        />
        
        {/* Nutrition Panel */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <NutritionPanel 
            src={product?.images?.[0]?.url || "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292"}
          />
        </div>
      </div>
    </div>
  );
}