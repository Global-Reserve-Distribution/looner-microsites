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

// Extract color metafields from Shopify product
function extractColorMetafields(product: any) {
  const metafields = product.metafields || [];
  
  const primaryColorField = metafields.find(
    (field: any) => field && field.key === "primary_color" && field.namespace === "custom",
  );
  const secondaryColorField = metafields.find(
    (field: any) => field && field.key === "secondary_color" && field.namespace === "custom",
  );

  return {
    primary: primaryColorField?.value || null,
    secondary: secondaryColorField?.value || null,
  };
}

// Transform Shopify products to flavors format
function transformProductsToFlavors(products: any[]): any[] {
  return products.map((product) => ({
    title: product.title,
    description: product.description,
    images: product.images?.map((img: any) => img.url) || [],
    tags: product.tags || [],
    variants: product.variants || [{ title: "Single Can", price: 4.99 }],
    primaryColor: extractColorMetafields(product).primary,
    secondaryColor: extractColorMetafields(product).secondary,
  }));
}

// Transform admin API products to flavors format
function transformAdminProductsToFlavors(products: any[]): any[] {
  return products.map((product) => ({
    title: product.title,
    description: product.description,
    images: product.images?.map((img: any) => img.url) || [],
    tags: product.tags || [],
    variants: product.variants || [{ title: "Single Can", price: 4.99 }],
    primaryColor: extractColorMetafields(product).primary,
    secondaryColor: extractColorMetafields(product).secondary,
  }));
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
        let allTransformedFlavors: any[] = [];
        try {
          const adminProducts = await fetchProductsWithAdminCategories();
          if (adminProducts.length > 0) {
            allTransformedFlavors =
              transformAdminProductsToFlavors(adminProducts);
          }
        } catch (adminError) {
          const storefrontProducts = await fetchProducts({
            sortKey: "BEST_SELLING",
          });
          allTransformedFlavors =
            transformProductsToFlavors(storefrontProducts);
        }

        let filteredFlavors = allTransformedFlavors.filter((flavor) => {
          if (flavor.category?.name) {
            return flavor.category.name.toLowerCase() === "soda";
          }
          const title = (flavor.title || "").toLowerCase();
          const tags = (flavor.tags || []).map((tag: any) =>
            tag.toLowerCase(),
          );
          return (
            tags.some((tag: any) => tag.includes("soda")) || title.includes("soda")
          );
        });

        if (filteredFlavors.length === 0) {
          filteredFlavors = allTransformedFlavors;
        }

        console.log("Loaded flavors:", filteredFlavors.length, filteredFlavors);
        setFlavors(filteredFlavors);

        const defaultFlavor =
          filteredFlavors.find(
            (f) => f.title.toLowerCase().replace(/\s+/g, "-") === slug,
          ) || filteredFlavors[0];

        console.log("Selected flavor:", defaultFlavor);
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
      <main className="min-h-screen bg-white animate-pulse">
        {/* shimmer loading skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl" />
              <div className="h-32 bg-gray-200 rounded-xl" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-8 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-100 rounded" />
            <div className="h-48 bg-gray-100 rounded-xl" />
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
          <div className="space-y-8">
            <OlipopStyleGrid selectedFlavor={selectedFlavor} />
          </div>

          <div className="space-y-8">
            <div>
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
              variant={pickerVariant}
            />

            <PurchaseOptions
              flavor={selectedFlavor}
              variant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          </div>
        </div>

        <div className="relative">
          {/* Wavy flavor-colored section */}
          {/* ... keep Product Info + Features + Waves as-is ... */}
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <RecommendedFlavors
            allFlavors={regularFlavors}
            currentFlavor={selectedFlavor?.title}
            onSelectFlavor={(flavor) => {
              setSelectedFlavor(flavor);
              setSelectedVariant(flavor.variants[0]);
            }}
          />
        </div>

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

        {/* Recommended Flavors Section */}
        <RecommendedFlavors
          allFlavors={flavors}
          currentFlavor={selectedFlavor?.title || ""}
          onSelectFlavor={(flavor) => {
            setSelectedFlavor(flavor);
            setSelectedVariant(flavor.variants[0]);
          }}
        />
      </div>
    </main>
  );
}
