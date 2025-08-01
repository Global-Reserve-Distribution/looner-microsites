"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";
import { useCart } from "../hooks/useCart";
import Image from "next/image";
import Link from "next/link";

interface ProductPageConfig {
  productType: 'soda-10mg' | 'soda-50mg' | 'edibles' | 'gummies';
  title: string;
  description: string;
  sectionTitle: string;
  sectionDescription: string;
  defaultColor: string;
  defaultSecondaryColor: string;
  dosageInfo: {
    title: string;
    subtitle: string;
    borderColor: string;
    textColor: string;
    onsetTime: string;
    duration: string;
    experience: string;
    bestFor: string;
    backgroundClass: string;
    description: string;
  };
  features: Array<{ icon: string; label: string }>;
}

interface ProductPageProps {
  config: ProductPageConfig;
  products: any[];
}

// Flavor variants with colors matching the Figma design
const FLAVOR_VARIANTS = [
  { id: 'half-half', name: 'Half & Half', color: '#cd9848', bgColor: '#cd9848' },
  { id: 'peach-lemonade', name: 'Peach Lemonade', color: '#f68d67', bgColor: '#f68d67' },
  { id: 'classic-lemonade', name: 'Classic Lemonade', color: '#ffc629', bgColor: '#ffc629' },
  { id: 'pink-lemonade', name: 'Pink Lemonade', color: '#f37a8b', bgColor: '#f37a8b' },
  { id: 'mule-mocktail', name: 'Mule Mocktail', color: '#95cba8', bgColor: '#95cba8' },
  { id: 'cherry-cola', name: 'Cherry Cola', color: '#ae252f', bgColor: '#ae252f' },
];

function ProductGallery({ selectedFlavor, products }: { selectedFlavor: string; products: any[] }) {
  const mainProduct = products[0] || {};
  const selectedVariant = FLAVOR_VARIANTS.find(v => v.id === selectedFlavor) || FLAVOR_VARIANTS[0];

  return (
    <div className="w-[642px] h-[1094px] overflow-hidden">
      {/* Main Product Images */}
      <div className="flex gap-5 mb-5">
        <div className="w-[301px] h-[301px] bg-gray-300 rounded-2xl overflow-hidden">
          {mainProduct.featuredImage?.url ? (
            <img
              src={mainProduct.featuredImage.url}
              alt={mainProduct.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
          )}
        </div>
        <div className="w-[301px] h-[301px] bg-gray-300 rounded-2xl overflow-hidden">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Product Image 2</span>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-[622px] h-[353px] bg-gray-300 rounded-2xl mb-5 overflow-hidden">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Product Video</span>
        </div>
      </div>

      {/* Product Features Section */}
      <div className="flex gap-5">
        {/* Main Product Display */}
        <div 
          className="w-[442px] h-[400px] rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: selectedVariant.color }}
        >
          <div className="w-[395px] h-[418px] bg-gray-300 overflow-hidden">
            {mainProduct.featuredImage?.url ? (
              <img
                src={mainProduct.featuredImage.url}
                alt={mainProduct.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Main Product</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-5 w-[160px]">
          <div className="bg-[#faa81e] rounded-2xl w-[160px] h-[95px] flex items-center justify-center text-center">
            <span className="text-white font-bold text-[18.6px] leading-[23px]">
              10mg<br />THC
            </span>
          </div>
          <div className="bg-[#faa81e] rounded-2xl w-[160px] h-[120px] flex items-center justify-center text-center p-4">
            <span className="text-white font-bold text-[18.6px] leading-[20px]">
              Made with<br />Cane Sugar
            </span>
          </div>
          <div className="bg-[#faa81e] rounded-2xl w-[160px] h-[120px] flex items-center justify-center text-center">
            <span className="text-white font-bold text-[18.6px] leading-[23px]">
              Gluten<br />Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlavorSelector({ selectedFlavor, onFlavorChange }: { selectedFlavor: string; onFlavorChange: (flavor: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      {FLAVOR_VARIANTS.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onFlavorChange(variant.id)}
          className={`w-[108px] h-[106px] border rounded-lg overflow-hidden ${
            selectedFlavor === variant.id ? 'border-[#14433d] border-2' : 'border-[#14433d40]'
          }`}
        >
          <div 
            className="w-full h-[53.5px] flex items-center justify-center"
            style={{ backgroundColor: variant.color }}
          >
            <div className="w-full h-full bg-gray-300">
              {/* Flavor image would go here */}
            </div>
          </div>
          <div className="bg-white rounded-b-lg p-2 h-[52.5px] flex items-center justify-center">
            <p className="text-[#14433d] text-[13px] font-bold leading-[19.25px] text-center">
              {variant.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function PurchaseSection({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  
  const firstVariant = product?.variants?.[0];
  const price = typeof firstVariant?.price === 'object' 
    ? firstVariant.price.amount 
    : firstVariant?.price || '59';

  return (
    <div className="w-[480px]">
      {/* Purchase Options */}
      <div className="mb-6">
        <div className="space-y-3">
          {/* One-time Purchase */}
          <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer ${
            purchaseType === 'one-time' ? 'border-[#22423d]' : 'border-[#22423d] opacity-60'
          }`}>
            <input
              type="radio"
              name="purchaseType"
              value="one-time"
              checked={purchaseType === 'one-time'}
              onChange={(e) => setPurchaseType(e.target.value as 'one-time')}
              className="mr-3"
            />
            <div className="flex-1">
              <div className="font-bold text-[#14433d] text-[15.1px] mb-1">One-time Purchase</div>
              <div className="flex items-center gap-2">
                <span className="text-[11.4px] text-[#14433d]">12 Cans</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#14433d]">${price}</span>
                  <span className="text-[11.4px] text-[#14433d] line-through">$99</span>
                </div>
              </div>
            </div>
            <div className="bg-[#fdda79] px-3 py-1 rounded text-[13px] font-bold text-[#14433d]">
              Save 15%
            </div>
          </label>

          {/* Subscription */}
          <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer ${
            purchaseType === 'subscription' ? 'border-[#22423d]' : 'border-[#22423d] opacity-60'
          }`}>
            <input
              type="radio"
              name="purchaseType"
              value="subscription"
              checked={purchaseType === 'subscription'}
              onChange={(e) => setPurchaseType(e.target.value as 'subscription')}
              className="mr-3"
            />
            <div className="flex-1">
              <div className="font-bold text-[#14433d] text-[15.1px] mb-1">Subscribe & Save</div>
              <div className="flex items-center gap-2">
                <span className="text-[11.4px] text-[#14433d]">12 Cans</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#14433d]">${(parseFloat(price) * 0.85).toFixed(0)}</span>
                  <span className="text-[11.4px] text-[#14433d] line-through">${price}</span>
                </div>
              </div>
            </div>
            <div className="bg-[#fdda79] px-3 py-1 rounded text-[13px] font-bold text-[#14433d]">
              Save 15%
            </div>
          </label>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[#14433d] font-medium">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-[#14433d] hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-1 text-[#14433d] font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-[#14433d] hover:bg-gray-100"
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
        productPrice={`$${price}`}
        variant="primary"
        className="w-full bg-[#14433d] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#14433d]/90 transition-colors"
      >
        Add to Cart - ${(parseFloat(price) * quantity).toFixed(0)}
      </AddToCartButton>
    </div>
  );
}

function ProductPageContent({ config, products }: ProductPageProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_VARIANTS[0].id);
  const searchParams = useSearchParams();
  const { cart } = useCart();

  const mainProduct = products[0] || {};

  useEffect(() => {
    const flavorParam = searchParams.get('flavor');
    if (flavorParam) {
      const matchingFlavor = FLAVOR_VARIANTS.find(f => 
        f.name.toLowerCase().replace(/\s+/g, '-') === flavorParam.toLowerCase()
      );
      if (matchingFlavor) {
        setSelectedFlavor(matchingFlavor.id);
      }
    }
  }, [searchParams]);

  const selectedVariant = FLAVOR_VARIANTS.find(v => v.id === selectedFlavor) || FLAVOR_VARIANTS[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e3edd0' }}>
      {/* Hero/Main Section */}
      <div className="bg-[#fffbf5] pb-16">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div className="flex gap-[78px]">
            {/* Product Gallery - Left Side */}
            <ProductGallery selectedFlavor={selectedFlavor} products={products} />

            {/* Product Info - Right Side */}
            <div className="w-[480px] space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-[44.2px] font-bold leading-[48px] text-[#ffa13c] mb-4">
                  {config.title}
                </h1>
                <p className="text-[17px] leading-[28px] text-[#ffa13c] mb-6">
                  {config.description}
                </p>
              </div>

              {/* Flavor Tabs */}
              <div className="flex gap-1 mb-6">
                <button className="bg-white px-[70px] py-3 rounded-t-lg font-bold text-[#14433d] text-[16.6px]">
                  Our Flavors
                </button>
                <button className="bg-[#c1c1c1] px-[60px] py-3 rounded-t-lg font-bold text-[#14433d] text-[16.6px]">
                  Variety Packs
                </button>
              </div>

              {/* Flavor Selector */}
              <div className="bg-white rounded-b-lg p-6">
                <FlavorSelector 
                  selectedFlavor={selectedFlavor} 
                  onFlavorChange={setSelectedFlavor} 
                />
                
                {/* Purchase Section */}
                <PurchaseSection product={mainProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="w-full h-[60px]">
        <svg viewBox="0 0 1425 60" className="w-full h-full" fill="#fffbf5">
          <path d="M0,0 C150,60 300,60 450,30 C600,0 750,0 900,30 C1050,60 1200,60 1350,30 L1425,30 L1425,0 Z" />
        </svg>
      </div>

      {/* Ingredients Section */}
      <div className="bg-[#b2fffb] py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex gap-12">
            {/* Nutrition Facts */}
            <div className="w-[250px]">
              <div className="bg-white border-4 border-[#ffa13c] rounded-[25px] p-4">
                <div className="border-b-4 border-[#ffa13c] pb-2 mb-4">
                  <h3 className="text-[29.4px] font-black text-[#ffa13c] leading-[28px]">
                    Nutrition Facts
                  </h3>
                  <p className="text-[13px] text-[#ffa13c]">1 Servings Per Container</p>
                </div>
                
                <div className="space-y-1 text-[13px] text-[#ffa13c]">
                  <div className="flex justify-between">
                    <span>Serving Size</span>
                    <span className="font-bold">12 fl oz (355mL)</span>
                  </div>
                  <div className="border-t border-[#ffa13c] pt-1">
                    <p className="text-[11.8px] font-bold">Amount Per Serving</p>
                  </div>
                  <div className="border-t-4 border-[#ffa13c] pt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[29.4px] font-black">Calories</span>
                      <span className="text-[29.4px] font-black">90</span>
                    </div>
                  </div>
                  <div className="border-t-4 border-[#ffa13c] pt-1 space-y-1">
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
                    <div className="border-t-4 border-[#ffa13c] pt-1">
                      <div className="flex justify-between">
                        <span>Protein 0g</span>
                        <span className="font-bold">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info & Ingredients */}
            <div className="flex-1 max-w-[630px]">
              <h2 className="text-[44.2px] font-bold leading-[48px] text-[#ffa13c] mb-6">
                Sweet Orange Soda
              </h2>
              
              <p className="text-[17px] leading-[28px] text-[#ffa13c] mb-8">
                That old-school orange flavor! Bright, sweet, and crisp. Now with 10mg THC.
              </p>

              <div className="mb-8">
                <h3 className="text-[17.3px] font-medium text-[#ffa13c] mb-4">Ingredients:</h3>
                <p className="text-[17.3px] leading-[28px] text-[#ffa13c]">
                  Carbonated Water, Cane Sugar, Citric Acid, Sodium Benzoate (preserves freshness), 
                  FD&C Yellow #6, Natural Flavors, Orange Oils, Hemp Extract
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: 'Plant-Derived THC', icon: '🌿' },
                  { label: 'Made with Cane Sugar', icon: '🌾' },
                  { label: 'Vegan', icon: '🌱' },
                  { label: 'Gluten Free', icon: '✨' },
                  { label: 'Filtered Water', icon: '💧' },
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center gap-3 p-4">
                    <div className="w-[60px] h-[60px] bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <span className="text-[16.6px] font-bold text-[#14433d] text-center leading-[20px]">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="w-full h-[60px]">
        <svg viewBox="0 0 1425 60" className="w-full h-full" fill="#b2fffb">
          <path d="M0,60 C150,0 300,0 450,30 C600,60 750,60 900,30 C1050,0 1200,0 1350,30 L1425,30 L1425,60 Z" />
        </svg>
      </div>

      {/* You May Also Like Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#14433d] mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {products.slice(1, 5).map((product, index) => (
              <div key={product.id || index} className="bg-[#f3f4f6] rounded-lg p-4 text-center">
                <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  {product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">Product</span>
                  )}
                </div>
                <h3 className="font-semibold text-[#14433d] text-sm mb-2">
                  {product.title || 'Product Name'}
                </h3>
                <p className="text-[#14433d] text-xs">
                  ${product.variants?.[0]?.price || '35'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}