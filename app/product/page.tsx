"use client";

import React, { useState, useEffect, useRef } from "react";

import { useSearchParams } from "next/navigation";
import { FlavorHero } from "../../components/FlavorHero";
import { LifestyleImageGrid } from "../../components/LifestyleImageGrid";
import { FlavorPickerTabs } from "../../components/FlavorPickerTabs";
import { FlavorPickerVariants } from "../../components/FlavorPickerVariants";
import { PurchaseOptions } from "../../components/PurchaseOptions";
import { FlavorBackground } from "../../components/FlavorBackground";
import { OlipopStyleGrid } from "../../components/OlipopStyleGrid";
import { RecommendedFlavors } from "../../components/RecommendedFlavors";
import { Header } from "../../components/Header";
import { MobileHeader } from "../../components/MobileHeader";
import { StickyCartFooter } from "../../components/StickyCartFooter";
import {
  fetchProducts,
  fetchProductsWithAdminCategories,
} from "../../lib/shopify/server-actions";
import { useCart } from "../../hooks/useCart";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

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

// Extract metafields from Shopify product
function extractMetafields(product: any) {
  const metafields = product.metafields || [];

  // Debug: Log metafields to see what's actually returned
  if (product.title?.includes("Professor Pepper")) {
    console.log("Professor Pepper metafields:", metafields);
    console.log("Product title:", product.title);
  }

  const primaryColorField = metafields.find(
    (field: any) =>
      field && field.key === "primary_color" && field.namespace === "custom",
  );
  const secondaryColorField = metafields.find(
    (field: any) =>
      field && field.key === "secondary_color" && field.namespace === "custom",
  );
  const displayNameField = metafields.find(
    (field: any) =>
      field && field.key === "display_name" && field.namespace === "custom",
  );
  const shortDescriptionField = metafields.find(
    (field: any) =>
      field && field.key === "short_description" && field.namespace === "custom",
  );

  return {
    primaryColor: primaryColorField?.value || null,
    secondaryColor: secondaryColorField?.value || null,
    displayName: displayNameField?.value || null,
    shortDescription: shortDescriptionField?.value || null,
  };
}

// Transform Admin API products to flavor format
function transformAdminProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
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
        ...(product.images?.edges || [])
          .slice(0, 3)
          .map((edge: any) => edge.node.url),
      ],
      variants: [
        {
          id: `${product.handle}-12`,
          title: "12 Cans",
          price:
            parseFloat(product.priceRangeV2?.minVariantPrice?.amount) || 35.99,
        },
        {
          id: `${product.handle}-24`,
          title: "24 Cans",
          price:
            (parseFloat(product.priceRangeV2?.minVariantPrice?.amount) ||
              35.99) * 1.8,
        },
      ],
    };
  });
}

// Transform Shopify products to flavor format (fallback)
function transformProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
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

export default function ProductPage() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get("flavor");

  const [flavors, setFlavors] = useState<any[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Cart functionality
  const { cart, addToCart, isLoading: cartLoading } = useCart();
  
  // Intersection observer for purchase button
  const purchaseButtonRef = useRef<HTMLDivElement>(null);
  const { isVisible: isPurchaseButtonVisible } = useIntersectionObserver({
    ref: purchaseButtonRef,
  });

  const handleAddToCart = async (merchandiseId: string, quantity: number) => {
    const success = await addToCart(merchandiseId, quantity);
    if (success) {
      console.log('Added to cart successfully!');
    }
  };
  const [pickerVariant, setPickerVariant] = useState<
    "olipop" | "premium" | "minimal" | "gradient"
  >("olipop");

  useEffect(() => {
    async function loadFlavors() {
      try {
        console.log("Starting to fetch products with Admin API...");

        // Try Admin API first for real category data
        let allTransformedFlavors: any[] = [];
        try {
          const adminProducts = await fetchProductsWithAdminCategories();
          console.log(
            "Admin API products received:",
            adminProducts?.length || 0,
          );
          console.log(
            "Admin product categories:",
            adminProducts?.map((p) => p.category?.name).filter(Boolean),
          );

          if (adminProducts.length > 0) {
            allTransformedFlavors =
              transformAdminProductsToFlavors(adminProducts);
          }
        } catch (adminError) {
          console.log(
            "Admin API failed, falling back to Storefront API:",
            adminError,
          );
        }

        // Fallback to Storefront API if Admin API fails
        if (allTransformedFlavors.length === 0) {
          const storefrontProducts = await fetchProducts({
            sortKey: "BEST_SELLING",
          });
          console.log(
            "Storefront API products received:",
            storefrontProducts?.length || 0,
          );
          allTransformedFlavors =
            transformProductsToFlavors(storefrontProducts);
        }

        console.log(
          "Total transformed flavors:",
          allTransformedFlavors?.length || 0,
        );

        // Filter to show soda products using real category data when available
        let filteredFlavors = allTransformedFlavors.filter((flavor) => {
          const tags = (flavor.tags || []).map((tag: string) =>
            tag.toLowerCase(),
          );

          // Exclude any products with 'bundle' tag from main flavors
          const hasBundle = tags.some((tag: string) => tag.includes("bundle"));
          if (hasBundle) {
            console.log(
              `Product: ${flavor.title} excluded from flavors (has bundle tag)`,
            );
            return false;
          }

          // If we have real category data from Admin API, use it
          if (flavor.category?.name) {
            const categoryName = flavor.category.name.toLowerCase();
            console.log(
              `Product: ${flavor.title}, Category: ${flavor.category.name}, Is Soda: ${categoryName === "soda"}`,
            );
            return categoryName === "soda";
          }

          // For Storefront API, ONLY use tag matching - no title fallback
          const hasSodaTag = tags.some((tag: string) => tag.includes("soda"));

          console.log(
            `Product: ${flavor.title}, Tags: ${JSON.stringify(flavor.tags)}, Has Soda Tag: ${hasSodaTag}`,
          );
          return hasSodaTag;
        });

        // If no specific beverages found, show all products (fallback)
        if (filteredFlavors.length === 0) {
          filteredFlavors = allTransformedFlavors;
          console.log(
            "Using fallback - showing all products:",
            filteredFlavors.length,
          );
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

  // Since no products have "bundle" tags, show variety packs based on specific naming patterns
  const varietyPacks = flavors.filter((f) => {
    const title = f.title.toLowerCase();
    const tags = (f.tags || []).map(tag => tag.toLowerCase());
    const hasSoda = tags.some(tag => tag.includes("soda"));
    // Look for variety/pack/bundle in title OR use first 3 flavors as variety pack examples
    const isVarietyByName = title.includes("variety") || title.includes("pack") || title.includes("bundle") || title.includes("mix");
    return hasSoda && isVarietyByName;
  });
  const regularFlavors = flavors.filter((f) => {
    const tags = (f.tags || []).map(tag => tag.toLowerCase());
    // Exclude bundle items from regular flavors
    return !tags.some(tag => tag.includes("bundle"));
  });

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
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header backgroundColor="white" />
      </div>
      
      {/* Mobile Header */}
      <MobileHeader backgroundColor="white" />
      
      <main className="relative overflow-hidden min-h-screen transition-all duration-500">
        <FlavorBackground color={selectedFlavor?.primaryColor || "#FFE5B4"} />

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-8 py-4 lg:py-6 max-w-7xl mx-auto">
          {/* Left Column - Olipop Style Grid */}
          <div className="space-y-4 lg:space-y-8 px-4 lg:px-0">
            <OlipopStyleGrid selectedFlavor={selectedFlavor} />
          </div>

          {/* Right Column - Product Info & Selection */}
          <div className="space-y-4 lg:space-y-8">
            {/* Product Title - Responsive sizing with consistent margins */}
            <div className="px-4 lg:px-0">
              <h1 className="text-3xl lg:text-5xl font-serif text-gray-900 mb-2 lg:mb-4">
                {selectedFlavor?.displayName || selectedFlavor?.title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6">
                {selectedFlavor?.shortDescription || "The perfect blend of sweet & tart."}
              </p>
            </div>

            <div className="px-4 lg:px-0">
              <FlavorPickerVariants
                flavors={regularFlavors}
                selectedFlavor={selectedFlavor}
                onFlavorSelect={(flavor) => {
                  setSelectedFlavor(flavor);
                  setSelectedVariant(flavor.variants[0]);
                }}
                variant="premium"
              />
            </div>

            <div className="px-4 lg:px-0">
              <PurchaseOptions
                ref={purchaseButtonRef}
                flavor={selectedFlavor}
                variant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </div>
          </div>
        </div>

        {/* Product Information Section with Teal Background */}
        <div 
          className="px-4 lg:px-0 mt-8 lg:mt-16 relative"
          style={{ backgroundColor: selectedFlavor?.secondaryColor || '#CCFBF1' }}
        >
          {/* Wavy top border */}
          <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 L0,0 Z"
                fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Product Description - 2/3 width */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-6">
                  Better Than Soda. Finally.
                </h2>
                <p className="text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                  {selectedFlavor?.description || "LOONER combines the nostalgic flavors you love with the functional benefits you need. Made with real fruit juices, cannabis extract, and a touch of cane sugar for that perfect balance of taste and effect."}
                </p>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Ingredients:</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Carbonated water, cane sugar, natural fruit flavors, cannabis extract (THC), citric acid, natural caffeine, vitamin B complex, and LOONER's proprietary blend of adaptogens including ashwagandha and L-theanine.
                  </p>
                </div>
              </div>

              {/* Nutrition Facts Panel - 1/3 width */}
              <div className="bg-white border-2 border-black p-4 lg:p-6">
                <h3 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">
                  Nutrition Facts
                </h3>
                <div className="space-y-2 text-sm text-black">
                  <div className="flex justify-between border-b border-gray-300 pb-1">
                    <span>Serving Size</span>
                    <span>1 can (12 fl oz)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-1">
                    <span className="font-semibold">Calories</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-1">
                    <span>Total Carbs</span>
                    <span>12g</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-1">
                    <span>Total Sugars</span>
                    <span>8g</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-1">
                    <span>Sodium</span>
                    <span>25mg</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-black pb-2 pt-2">
                    <span className="font-bold">THC Content</span>
                    <span className="font-bold">10mg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-8 mt-8 lg:mt-12">
              {[
                { icon: '🧪', label: 'Lab Tested' },
                { icon: '🌱', label: 'Non-GMO' },
                { icon: '🍯', label: 'Less Sugar' },
                { icon: '🌿', label: 'Natural Cannabis' },
                { icon: '⚡', label: 'Fast Acting' },
                { icon: '♻️', label: 'Sustainable' }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl mb-2">{feature.icon}</div>
                  <div className="text-xs lg:text-sm text-gray-700 font-medium">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wavy bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden rotate-180">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 L0,0 Z"
                fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
              />
            </svg>
          </div>
        </div>

        {/* Recommended Flavors Section */}
        <div className="px-4 lg:px-0 py-8 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <RecommendedFlavors 
              allFlavors={flavors}
              currentFlavor={selectedFlavor}
              onSelectFlavor={(flavor) => {
                setSelectedFlavor(flavor);
                setSelectedVariant(flavor.variants[0]);
              }}
            />
          </div>
        </div>

        {/* Simple wavy footer */}
        <div className="h-16 lg:h-24 bg-gradient-to-r from-teal-400 to-teal-500 relative overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute top-0 w-full h-full"
          >
            <path
              d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
              fill="#4ECDC4"
            />
          </svg>
        </div>
      </div>

      {/* Sticky Cart Footer for Mobile */}
      <StickyCartFooter
        cart={cart}
        isMainButtonVisible={isPurchaseButtonVisible}
        merchandiseId={selectedFlavor?.variants?.[0]?.merchandiseId || ''}
        productTitle={selectedFlavor?.title || ''}
        productPrice={`$${selectedFlavor?.variants?.[0]?.price || '35.99'}`}
        productImage={selectedFlavor?.images?.[0]}
      />
    </main>
    </>
  );
}