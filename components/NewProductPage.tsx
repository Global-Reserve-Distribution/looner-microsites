'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// Removed cart import temporarily for testing
// Temporary simplified add to cart button
function AddToCartButton({ children, className, ...props }: any) {
  return (
    <button 
      className={className}
      onClick={() => console.log('Add to cart clicked')}
      {...props}
    >
      {children}
    </button>
  );
}

interface ProductPageProps {
  config: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    purchaseText: string;
    backgroundClass: string;
    products: any[];
  };
  products: any[];
}

const FLAVOR_VARIANTS = [
  { id: 'half-half', name: 'Half & Half', color: '#cd9848' },
  { id: 'peach-lemonade', name: 'Peach Lemonade', color: '#ff7f9b' },
  { id: 'classic-lemonade', name: 'Classic Lemonade', color: '#ffd700' },
  { id: 'pink-lemonade', name: 'Pink Lemonade', color: '#ff69b4' },
  { id: 'mule-mocktail', name: 'Mule Mocktail', color: '#95cba8' },
  { id: 'cherry-cola', name: 'Cherry Cola', color: '#ae252f' },
];

function FlavorSelector({ selectedFlavor, onFlavorChange }: { 
  selectedFlavor: string; 
  onFlavorChange: (flavor: string) => void; 
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Our Flavors</h3>
      <div className="grid grid-cols-3 gap-4">
        {FLAVOR_VARIANTS.map((flavor) => (
          <button
            key={flavor.id}
            onClick={() => onFlavorChange(flavor.id)}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              selectedFlavor === flavor.id 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-2"
              style={{ backgroundColor: flavor.color }}
            />
            <span className="text-sm font-medium text-gray-900">
              {flavor.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PurchaseOptions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  
  const firstVariant = product?.variants?.[0];
  const basePrice = typeof firstVariant?.price === 'object' 
    ? parseFloat(firstVariant?.price?.amount || '19.99')
    : parseFloat(firstVariant?.price || '19.99');
  
  const subscriptionPrice = Math.floor(basePrice * 0.85); // 15% off for subscription
  const currentPrice = purchaseType === 'subscription' ? subscriptionPrice : basePrice;

  return (
    <div className="space-y-6">
      {/* Purchase Type Selection */}
      <div className="space-y-3">
        <label className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
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
              <div className="font-semibold text-gray-900">One-time Purchase</div>
              <div className="text-sm text-gray-600">
                12 Cans <span className="font-semibold">${basePrice}</span> <span className="line-through text-gray-400">$99</span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-200 px-2 py-1 rounded text-xs font-semibold">
            Save 15%
          </div>
        </label>

        <label className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg cursor-pointer">
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
              <div className="font-semibold text-gray-900">Subscribe & Save</div>
              <div className="text-sm text-gray-600">
                12 Cans <span className="font-semibold">${subscriptionPrice}</span> <span className="line-through text-gray-400">${basePrice}</span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-200 px-2 py-1 rounded text-xs font-semibold">
            Save 15%
          </div>
        </label>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-900">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-1 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <AddToCartButton
        merchandiseId={firstVariant?.id || ''}
        quantity={quantity}
        productTitle={product?.title}
        productPrice={`$${currentPrice}`}
        variant="primary"
        className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Add to Cart - ${(currentPrice * quantity).toFixed(0)}
      </AddToCartButton>
    </div>
  );
}

function NutritionFacts() {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      <h3 className="font-bold text-lg mb-4 border-b border-gray-300 pb-2">
        Nutrition Facts
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between border-b border-gray-200 pb-1">
          <span>1 Servings Per Container</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Serving Size</span>
          <span>12 fl oz (355mL)</span>
        </div>
        <div className="border-b-4 border-gray-900 pb-2 mb-2">
          <span className="font-bold">Amount Per Serving</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Calories 90</span>
        </div>
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
  );
}

function ProductContent({ config, products }: ProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_VARIANTS[0]?.id || 'half-half');
  const searchParams = useSearchParams();

  const mainProduct = products?.[0] || {};

  useEffect(() => {
    const flavorParam = searchParams.get('flavor');
    if (flavorParam && Array.isArray(FLAVOR_VARIANTS)) {
      const matchingFlavor = FLAVOR_VARIANTS.find(f => 
        f?.name?.toLowerCase().replace(/\s+/g, '-') === flavorParam.toLowerCase()
      );
      if (matchingFlavor?.id) {
        setSelectedFlavor(matchingFlavor.id);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {config.heroTitle || '10mg Soda Products'}
            </h1>
            <p className="text-xl text-gray-600">
              {config.heroSubtitle || 'Perfect 10mg THC soda.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Product Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Product Image */}
                <div className="text-center">
                  <div className="bg-gray-200 w-64 h-64 mx-auto rounded-lg flex items-center justify-center mb-4">
                    {mainProduct?.featuredImage?.url ? (
                      <img
                        src={mainProduct.featuredImage.url}
                        alt={mainProduct.title || 'Product'}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400">Product Image</span>
                    )}
                  </div>
                  <div className="bg-gray-200 w-32 h-32 mx-auto rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Product Image 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Flavors & Purchase */}
            <div className="lg:col-span-1">
              <FlavorSelector 
                selectedFlavor={selectedFlavor}
                onFlavorChange={setSelectedFlavor}
              />
              <PurchaseOptions product={mainProduct} />
            </div>

            {/* Right Column - Variety Packs placeholder */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Variety Packs</h3>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <span className="text-gray-500">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Nutrition Facts */}
            <div>
              <NutritionFacts />
            </div>

            {/* Right - Product Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Sweet Orange Soda
              </h2>
              <p className="text-lg text-gray-600">
                That old-school orange flavor! Bright, sweet, and crisp. Now with 10mg THC.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingredients:</h3>
                <p className="text-gray-600">
                  Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), 
                  FD&C Yellow #6, Natural Flavors, Orange Oils, Hemp Extract
                </p>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-5 gap-4 pt-8">
                {[
                  { label: 'Plant-Derived THC', icon: '🌿' },
                  { label: 'Made with Cane Sugar', icon: '🌾' },
                  { label: 'Vegan', icon: '🌱' },
                  { label: 'Gluten Free', icon: '✨' },
                  { label: 'Filtered Water', icon: '💧' },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <span className="text-xs font-medium text-gray-700">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {(products || []).slice(1, 5).map((product, index) => (
              <div key={product?.id || index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  {product?.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product?.title || 'Product'}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">Product</span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  {product?.title || 'Product Name'}
                </h3>
                <p className="text-gray-900 font-bold">
                  ${typeof product?.variants?.[0]?.price === 'object' 
                    ? product?.variants?.[0]?.price?.amount || '19.99'
                    : product?.variants?.[0]?.price || '19.99'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-2xl mr-2">🌿</span>
            <span className="text-xl font-bold">LOONER THC BEVERAGES</span>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Shop Now
          </button>
          <div className="mt-8 text-sm text-gray-400">
            <p>© 2025 LOONER. All rights reserved.</p>
            <p className="mt-2">Browse THC Beverages</p>
            <p>Premium Cannabis Beverages</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function NewProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <ProductContent {...props} />
    </Suspense>
  );
}