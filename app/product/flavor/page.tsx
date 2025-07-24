"use client";

import React, { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { FlavorHero } from "../../../components/FlavorHero";
import { LifestyleImageGrid } from "../../../components/LifestyleImageGrid";
import { FlavorPickerTabs } from "../../../components/FlavorPickerTabs";
import { FlavorPickerVariants } from "../../../components/FlavorPickerVariants";
import { PurchaseOptions } from "../../../components/PurchaseOptions";
import { FlavorBackground } from "../../../components/FlavorBackground";
import { OlipopStyleGrid } from "../../../components/OlipopStyleGrid";
import { RecommendedFlavors } from "../../../components/RecommendedFlavors";
import { Header } from "../../../components/Header";
import {
  fetchProducts,
  fetchProductsWithAdminCategories,
} from "../../../lib/shopify/server-actions";

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

export default function FlavorPage() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get("flavor");

  const [flavors, setFlavors] = useState<any[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
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

  const varietyPacks = flavors.filter((f) =>
    f.tags.some((tag: string) => tag.toLowerCase().includes("variety")),
  );
  const regularFlavors = flavors.filter(
    (f) => !f.tags.some((tag: string) => tag.toLowerCase().includes("variety")),
  );

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
      <Header backgroundColor="white" />
      <main className="relative overflow-hidden min-h-screen transition-all duration-500">
        <FlavorBackground color={selectedFlavor?.primaryColor || "#FFE5B4"} />

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 px-4 py-6 max-w-7xl mx-auto">
          {/* Left Column - Olipop Style Grid */}
          <div className="space-y-8">
            <OlipopStyleGrid selectedFlavor={selectedFlavor} />
          </div>

          {/* Right Column - Product Info & Selection */}
          <div className="space-y-8">
            <div className="hidden md:block">
              <h1 className="text-5xl font-serif text-gray-900 mb-4">
                {selectedFlavor?.title}
              </h1>
              <p className="text-xl text-gray-600">
                The perfect blend of sweet & tart.
              </p>
            </div>

            <FlavorPickerVariants
              flavors={regularFlavors}
              selectedFlavor={selectedFlavor}
              onFlavorSelect={(flavor) => {
                setSelectedFlavor(flavor);
                setSelectedVariant(flavor.variants[0]);
              }}
              variant="premium"
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
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-3 gap-12 items-start">
                {/* Product Description - 2/3 width */}
                <div className="col-span-2">
                  <h2 className="text-4xl font-bold text-gray-900 mb-8">
                    {selectedFlavor?.title}
                  </h2>
                  <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      {selectedFlavor?.description ||
                        "Crack open a swift kick of boldly refreshing flavors. This flavor is a head-on collision of ingredients like rich plums, sweet prunes, and zesty tart cherries with a touch of pure vanilla extract for a true soda enigma the Doctor would actually order."}
                    </p>
                    <div className="space-y-4">
                      <p className="text-base">
                        <strong className="text-gray-900">Ingredients:</strong>{" "}
                        Carbonated Water, OLISMART (Cassava Root Fiber, Chicory
                        Root Inulin, Jerusalem Artichoke Inulin, Nopal Cactus*,
                        Marshmallow Root*, Calendula Flower*, Kudzu Root*),
                        Allulose Syrup, Cassava Root Syrup, Prune Juice
                        Concentrate, Natural Flavors, Plum Juice Concentrate,
                        Tart Cherry Juice Concentrate, Stevia Leaf*, Himalayan
                        Pink Salt, Green Tea Caffeine*, Malic Acid.
                      </p>
                      <p className="text-sm text-gray-600">*Extract</p>
                    </div>
                  </div>
                </div>

                {/* Nutrition Facts - 1/3 width */}
                <div className="col-span-1">
                  <div className="bg-white rounded-lg p-6 shadow-sm border-4 border-black">
                    <h3 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">
                      Nutrition Facts
                    </h3>
                    <div className="space-y-2 text-sm text-black">
                      <div className="flex justify-between border-b border-black/30 pb-1">
                        <span>Serving Size</span>
                        <span className="font-medium">1 can (12 fl oz)</span>
                      </div>
                      <div className="flex justify-between border-b border-black/30 pb-1">
                        <span>Calories</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between border-b border-black/30 pb-1">
                        <span>Total Sugars</span>
                        <span className="font-medium">8g</span>
                      </div>
                      <div className="flex justify-between border-b border-black/30 pb-1">
                        <span>Sodium</span>
                        <span className="font-medium">15mg</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-black pb-2 pt-2">
                        <span className="font-bold">THC Content</span>
                        <span className="font-bold">10mg</span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              {/* Feature Icons Row - Full Width Below Both Sections */}
              <div className="w-full flex justify-center items-center gap-6 mt-16">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L14.09 8.26L20 8.26L15.54 12.06L17.64 18.32L12 14.84L6.36 18.32L8.46 12.06L4 8.26L9.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    Cannabis Infused
                  </h4>
                  <p className="text-xs text-gray-600">
                    Premium THC extract
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    Non GMO
                  </h4>
                  <p className="text-xs text-gray-600">
                    Natural ingredients
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 6 11 6C15.4183 6 19 9.58172 19 14Z" />
                      <path d="M8 14L10 16L16 10" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    Less Sugar
                  </h4>
                  <p className="text-xs text-gray-600">Only 8g per can</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 10.5C16.3807 10.5 17.5 9.38071 17.5 8C17.5 6.61929 16.3807 5.5 15 5.5C13.6193 5.5 12.5 6.61929 12.5 8C12.5 9.38071 13.6193 10.5 15 10.5Z" />
                      <path d="M12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8C18 11.0981 15.75 16 12 22C8.25 16 6 11.0981 6 8C6 6.4087 6.63214 4.88258 7.75736 3.75736C8.88258 2.63214 10.4087 2 12 2Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    Made in Minnesota
                  </h4>
                  <p className="text-xs text-gray-600">Locally crafted</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    High Quality
                  </h4>
                  <p className="text-xs text-gray-600">
                    Lab tested purity
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 stroke-black stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 7V13L16 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-xs mb-1">
                    Consistent
                  </h4>
                  <p className="text-xs text-gray-600">
                    Reliable effects
                  </p>
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

        {/* Recommended Flavors Section */}
        <RecommendedFlavors
          allFlavors={regularFlavors}
          currentFlavor={selectedFlavor?.title || ""}
          onSelectFlavor={(flavor) => {
            setSelectedFlavor(flavor);
            setSelectedVariant(flavor.variants[0]);
          }}
        />

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
    </>
  );
}
