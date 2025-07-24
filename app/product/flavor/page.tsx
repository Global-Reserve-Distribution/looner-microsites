"use client";

import React, { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { FlavorHero } from "../../../components/FlavorHero";
import { LifestyleImageGrid } from "../../../components/LifestyleImageGrid";
import { FlavorPickerTabs } from "../../../components/FlavorPickerTabs";
import { PurchaseOptions } from "../../../components/PurchaseOptions";
import { FlavorBackground } from "../../../components/FlavorBackground";
import { fetchProducts, fetchProductsWithAdminCategories } from "../../../lib/shopify/server-actions";

function getTagEmoji(tag: string): string {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes("cannabis") || tagLower.includes("infused"))
    return "🌿";
  if (tagLower.includes("made") || tagLower.includes("cane")) return "🎯";
  if (tagLower.includes("iconic") || tagLower.includes("flavor")) return "⭐";
  if (tagLower.includes("made in") || tagLower.includes("minnesota"))
    return "📍";
  if (tagLower.includes("high") || tagLower.includes("quality")) return "✨";
  if (tagLower.includes("fiber")) return "🌾";
  if (tagLower.includes("gmo")) return "🌱";
  if (tagLower.includes("sugar")) return "🍯";
  if (tagLower.includes("thc")) return "🌿";
  return "✨";
}

// Extract color metafields from Shopify product
function extractColorMetafields(product: any) {
  const metafields = product.metafields || [];
  
  // Debug: Log metafields to see what's actually returned
  if (product.title?.includes("Professor Pepper")) {
    console.log("Professor Pepper metafields:", metafields);
    console.log("Product title:", product.title);
  }
  
  const primaryColorField = metafields.find(
    (field: any) => field && field.key === "primary_color" && field.namespace === "custom",
  );
  const secondaryColorField = metafields.find(
    (field: any) => field && field.key === "secondary_color" && field.namespace === "custom",
  );

  return {
    primaryColor: primaryColorField?.value || null,
    secondaryColor: secondaryColorField?.value || null,
  };
}

// Transform Admin API products to flavor format
function transformAdminProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor } = extractColorMetafields(product);

    return {
      title: product.title,
      description: product.description || "",
      tags: product.tags || [
        "Cannabis Infused",
        "Made with Cane Sugar",
        "Made in Minnesota",
        "High Quality",
      ],
      productType: product.productType || "",
      vendor: product.vendor || "",
      category: product.category || null,
      bgColor: primaryColor
        ? `bg-[${primaryColor}]`
        : getFlavorBgClass(product.title, index),
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      images: [
        product.featuredImage?.url || "",
        ...(product.images?.edges || []).slice(0, 3).map((edge: any) => edge.node.url),
      ],
      variants: [
        {
          id: `${product.handle}-12`,
          title: "12 Cans",
          price: parseFloat(product.priceRangeV2?.minVariantPrice?.amount) || 35.99,
        },
        {
          id: `${product.handle}-24`,
          title: "24 Cans",
          price:
            (parseFloat(product.priceRangeV2?.minVariantPrice?.amount) || 35.99) *
            1.8,
        },
      ],
    };
  });
}

// Transform Shopify products to flavor format (fallback)
function transformProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor } = extractColorMetafields(product);

    return {
      title: product.title,
      description: product.description || "",
      tags: product.tags || [
        "Cannabis Infused",
        "Made with Cane Sugar",
        "Made in Minnesota",
        "High Quality",
      ],
      productType: product.productType || "",
      vendor: product.vendor || "",
      category: null,
      bgColor: primaryColor
        ? `bg-[${primaryColor}]`
        : getFlavorBgClass(product.title, index),
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      images: [
        product.featuredImage?.url || "",
        ...product.images.slice(0, 3).map((img: any) => img.url),
      ],
      variants: [
        {
          id: `${product.handle}-12`,
          title: "12 Cans",
          price: parseFloat(product.priceRange.minVariantPrice.amount) || 35.99,
        },
        {
          id: `${product.handle}-24`,
          title: "24 Cans",
          price:
            (parseFloat(product.priceRange.minVariantPrice.amount) || 35.99) *
            1.8,
        },
      ],
    };
  });
}

function extractThcContent(product: any): string {
  const thcMatch = (product.title + " " + product.description).match(
    /(\d+\.?\d*)\s*mg\s*(thc|THC)/i,
  );
  return thcMatch ? `${thcMatch[1]}mg THC` : "10mg THC";
}

function getFlavorBgClass(title: string, index: number): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("grape")) return "bg-purple-100";
  if (titleLower.includes("orange")) return "bg-orange-100";
  if (titleLower.includes("cherry")) return "bg-red-100";
  if (titleLower.includes("strawberry")) return "bg-pink-100";
  if (titleLower.includes("cream")) return "bg-blue-100";
  if (titleLower.includes("vanilla")) return "bg-purple-100";
  if (titleLower.includes("apple")) return "bg-green-100";
  if (titleLower.includes("lemon")) return "bg-yellow-100";
  if (titleLower.includes("lime")) return "bg-lime-100";
  if (titleLower.includes("ginger")) return "bg-orange-200";

  const colors = [
    "bg-purple-100",
    "bg-orange-100",
    "bg-red-100",
    "bg-pink-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-lime-100",
  ];
  return colors[index % colors.length] || "bg-purple-100";
}

export default function FlavorPage() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get("flavor");

  const [flavors, setFlavors] = useState<any[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlavors() {
      try {
        console.log("Starting to fetch products with Admin API...");
        
        // Try Admin API first for real category data
        let allTransformedFlavors: any[] = [];
        try {
          const adminProducts = await fetchProductsWithAdminCategories();
          console.log("Admin API products received:", adminProducts?.length || 0);
          console.log("Admin product categories:", adminProducts?.map(p => p.category?.name).filter(Boolean));
          
          if (adminProducts.length > 0) {
            allTransformedFlavors = transformAdminProductsToFlavors(adminProducts);
          }
        } catch (adminError) {
          console.log("Admin API failed, falling back to Storefront API:", adminError);
        }
        
        // Fallback to Storefront API if Admin API fails
        if (allTransformedFlavors.length === 0) {
          const storefrontProducts = await fetchProducts({ sortKey: "BEST_SELLING" });
          console.log("Storefront API products received:", storefrontProducts?.length || 0);
          allTransformedFlavors = transformProductsToFlavors(storefrontProducts);
        }
        
        console.log("Total transformed flavors:", allTransformedFlavors?.length || 0);
        
        // Filter to show soda products using real category data when available
        let filteredFlavors = allTransformedFlavors.filter(flavor => {
          // If we have real category data from Admin API, use it
          if (flavor.category?.name) {
            const categoryName = flavor.category.name.toLowerCase();
            console.log(`Product: ${flavor.title}, Category: ${flavor.category.name}, Is Soda: ${categoryName === 'soda'}`);
            return categoryName === 'soda';
          }
          
          // Fallback to title/tag matching for Storefront API
          const title = (flavor.title || '').toLowerCase();
          const tags = (flavor.tags || []).map((tag: string) => tag.toLowerCase());
          
          const isSoda = tags.some((tag: string) => tag.includes('soda')) ||
                         title.includes('soda') ||
                         title.includes('pepper') ||
                         title.includes('grape') ||
                         title.includes('orange') ||
                         title.includes('lime') ||
                         title.includes('mule');
          
          console.log(`Product: ${flavor.title}, Tags: ${JSON.stringify(flavor.tags)}, Is Soda: ${isSoda}`);
          return isSoda;
        });
        
        // If no specific beverages found, show all products (fallback)
        if (filteredFlavors.length === 0) {
          filteredFlavors = allTransformedFlavors;
          console.log("Using fallback - showing all products:", filteredFlavors.length);
        } else {
          console.log("Found filtered flavors:", filteredFlavors.length);
        }
        
        setFlavors(filteredFlavors);

        const defaultFlavor =
          filteredFlavors.find(
            (f) => f.title.toLowerCase().replace(/\s+/g, "-") === slug,
          ) || filteredFlavors[0];

        setSelectedFlavor(defaultFlavor);
        setSelectedVariant(defaultFlavor?.variants[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading flavors:", error);
        setLoading(false);
      }
    }

    loadFlavors();
  }, [slug]);

  const varietyPacks = flavors.filter((f) => f.tags.some((tag: string) => tag.toLowerCase().includes("variety")));
  const regularFlavors = flavors.filter((f) => !f.tags.some((tag: string) => tag.toLowerCase().includes("variety")));

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!flavors || flavors.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Flavors unavailable
          </h1>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden min-h-screen transition-all duration-500">
      <FlavorBackground color={selectedFlavor?.primaryColor || "#FFE5B4"} />

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 max-w-7xl mx-auto">
          {/* Left Column - Product Image & Lifestyle */}
          <div className="space-y-8">
            {/* Large Product Image */}
            <div className="relative">
              <div
                className="rounded-3xl p-16 aspect-square flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: selectedFlavor?.secondaryColor || "#f3f4f6",
                }}
              >
                {selectedFlavor?.images[0] ? (
                  <img
                    src={selectedFlavor.images[0]}
                    alt={selectedFlavor.title}
                    className="w-full h-full object-contain drop-shadow-2xl max-w-sm"
                  />
                ) : (
                  <div className="w-64 h-80 relative">
                    <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 rounded-[40px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 rounded-t-[40px]"></div>
                      <div className="text-white text-center z-10 px-8">
                        <div className="text-5xl font-bold mb-4">LOONER</div>
                        <div className="text-2xl font-semibold mb-2">
                          {selectedFlavor?.title}
                        </div>
                        <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-lg font-bold">10mg THC</span>
                        </div>
                      </div>
                      <div className="absolute top-20 left-8 w-20 h-40 bg-white/10 rounded-full transform rotate-12 blur-xl"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedFlavor?.tags.map((tag: string) => (
                <div key={tag} className="text-center">
                  <div className="text-2xl mb-2">{getTagEmoji(tag)}</div>
                  <div className="font-medium text-gray-800 text-sm">{tag}</div>
                  <div className="h-0.5 bg-gray-800 mt-2 mx-auto w-8"></div>
                </div>
              ))}
            </div>

            {/* Lifestyle Images */}
            <LifestyleImageGrid
              images={selectedFlavor?.images?.slice(1) || []}
            />
          </div>

          {/* Right Column - Product Info & Selection */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif text-gray-900 mb-4">
                {selectedFlavor?.title}
              </h1>
              <p className="text-xl text-gray-600">
                The perfect blend of sweet & tart.
              </p>
            </div>

            <FlavorPickerTabs
              flavors={regularFlavors}
              varieties={varietyPacks}
              selectedTitle={selectedFlavor?.title}
              onSelect={(flavor) => {
                setSelectedFlavor(flavor);
                setSelectedVariant(flavor.variants[0]);
              }}
            />

            <PurchaseOptions
              flavor={selectedFlavor}
              variant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          </div>
        </div>

        {/* Product Information Section with Wavy Borders */}
        <div className="relative">
          {/* Top Wavy Border */}
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 L1200,80 L0,80 Z"
              fill={selectedFlavor?.primaryColor || "#CCFBF1"}
            />
          </svg>

          <div
            className="py-16"
            style={{
              backgroundColor: selectedFlavor?.primaryColor || "#CCFBF1",
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Product Description */}
                <div className="lg:col-span-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {selectedFlavor?.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedFlavor?.description ||
                      "Experience the perfect balance of refreshing taste and premium cannabis infusion. Each can is carefully crafted with natural cane sugar and features our signature blend that delivers consistent effects every time."}
                  </p>
                </div>

                {/* Nutrition Facts */}
                <div className="lg:col-span-1">
                  <div
                    className="rounded-lg p-6 shadow-sm text-white"
                    style={{
                      backgroundColor:
                        selectedFlavor?.primaryColor || "#4B5563",
                    }}
                  >
                    <h3 className="text-lg font-bold text-white mb-4 text-center border-b-2 border-white pb-2">
                      Nutrition Facts
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-white/30 pb-1">
                        <span>Serving Size</span>
                        <span className="font-medium">1 can (12 fl oz)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/30 pb-1">
                        <span>Calories</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between border-b border-white/30 pb-1">
                        <span>Total Sugars</span>
                        <span className="font-medium">8g</span>
                      </div>
                      <div className="flex justify-between border-b border-white/30 pb-1">
                        <span>Sodium</span>
                        <span className="font-medium">15mg</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-white pb-2 pt-2">
                        <span className="font-bold">THC Content</span>
                        <span className="font-bold">10mg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="lg:col-span-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🌿</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Cannabis Infused
                      </h4>
                      <p className="text-xs text-gray-600">
                        Premium THC extract
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Non GMO
                      </h4>
                      <p className="text-xs text-gray-600">
                        Natural ingredients
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🍯</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Less Sugar
                      </h4>
                      <p className="text-xs text-gray-600">Only 8g per can</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">📍</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Made in Minnesota
                      </h4>
                      <p className="text-xs text-gray-600">Locally crafted</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        High Quality
                      </h4>
                      <p className="text-xs text-gray-600">Lab tested purity</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        Consistent
                      </h4>
                      <p className="text-xs text-gray-600">Reliable effects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wavy Border */}
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,0 L0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40 L1200,0 Z"
              fill={selectedFlavor?.primaryColor || "#CCFBF1"}
            />
          </svg>
        </div>

        {/* Simple Wavy Footer Bar */}
        <div className="relative h-24 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,120 C200,140 400,100 600,120 C800,140 1000,100 1200,120 L1200,200 L0,200 Z"
              fill="#4ECDC4"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
