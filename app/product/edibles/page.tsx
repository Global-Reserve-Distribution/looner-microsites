"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FlavorHero } from "../../../components/FlavorHero";
import { LifestyleImageGrid } from "../../../components/LifestyleImageGrid";
import { FlavorPickerTabs } from "../../../components/FlavorPickerTabs";
import { FlavorPickerVariants } from "../../../components/FlavorPickerVariants";
import { PurchaseOptions } from "../../../components/PurchaseOptions";
import { FlavorBackground } from "../../../components/FlavorBackground";
import { OlipopStyleGrid } from "../../../components/OlipopStyleGrid";
import { RecommendedFlavors } from "../../../components/RecommendedFlavors";
import { StickyCartFooter } from "../../../components/StickyCartFooter";
import {
  fetchProducts,
  fetchProductsWithAdminCategories,
} from "../../../lib/shopify/server-actions";
import { useCart } from "../../../hooks/useCart";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

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
  if (tagLower.includes("edible")) return "🍯";
  return "✨";
}

// Extract metafields from Shopify product
function extractMetafields(product: any) {
  const metafields = product.metafields || [];

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
  const showBestSellerTagField = metafields.find(
    (field: any) =>
      field && field.key === "show_best_seller_tag" && field.namespace === "custom",
  );

  return {
    primaryColor: primaryColorField?.value || null,
    secondaryColor: secondaryColorField?.value || null,
    displayName: displayNameField?.value || null,
    shortDescription: shortDescriptionField?.value || null,
    showBestSellerTag: showBestSellerTagField?.value === 'true' || showBestSellerTagField?.value === true,
  };
}

// Transform Admin API products to flavor format
function transformAdminProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription, showBestSellerTag } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
      showBestSellerTag: showBestSellerTag,
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
      variants: (product.variants?.edges || []).map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: parseFloat(edge.node.price) || 0,
        availableForSale: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions || []
      })),
    };
  });
}

// Transform Shopify products to flavor format (fallback)
function transformProductsToFlavors(products: any[]) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription, showBestSellerTag } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
      showBestSellerTag: showBestSellerTag,
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
      variants: (product.variants || []).map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        price: parseFloat(variant.price?.amount) || 0,
        availableForSale: variant.availableForSale,
        selectedOptions: variant.selectedOptions || []
      })),
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
  if (titleLower.includes("chocolate")) return "bg-amber-100";
  if (titleLower.includes("gummy")) return "bg-red-100";
  if (titleLower.includes("mint")) return "bg-green-100";
  if (titleLower.includes("berry")) return "bg-purple-100";
  if (titleLower.includes("honey")) return "bg-yellow-100";
  if (titleLower.includes("caramel")) return "bg-orange-100";
  if (titleLower.includes("vanilla")) return "bg-stone-100";
  if (titleLower.includes("cherry")) return "bg-pink-100";

  const colors = [
    "bg-amber-100",
    "bg-red-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-yellow-100",
    "bg-orange-100",
    "bg-stone-100",
    "bg-pink-100",
  ];
  return colors[index % colors.length] || "bg-amber-100";
}

// Component that uses searchParams - needs to be in Suspense
function EdiblesPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get("flavor");

  const [flavors, setFlavors] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<any | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Cart functionality
  const { cart, addToCart, isLoading: cartLoading } = useCart();
  
  // Intersection observer for purchase button
  const purchaseButtonRef = useRef<HTMLDivElement>(null);
  const { isVisible: isPurchaseButtonVisible } = useIntersectionObserver({
    ref: purchaseButtonRef as React.RefObject<Element>,
  });

  const handleAddToCart = async (merchandiseId: string, quantity: number) => {
    const success = await addToCart(merchandiseId, quantity);
    if (success) {
      console.log('Added to cart successfully!');
    }
  };

  useEffect(() => {
    async function loadFlavors() {
      try {
        console.log("Starting to fetch edible products with Admin API...");

        let allTransformedFlavors: any[] = [];
        try {
          const adminProducts = await fetchProductsWithAdminCategories();
          console.log("Admin API products received:", adminProducts?.length || 0);

          if (adminProducts.length > 0) {
            allTransformedFlavors = transformAdminProductsToFlavors(adminProducts);
          }
        } catch (adminError) {
          console.log("Admin API failed, falling back to Storefront API:", adminError);
        }

        // Fallback to Storefront API if Admin API fails
        if (allTransformedFlavors.length === 0) {
          const storefrontProducts = await fetchProducts({
            sortKey: "BEST_SELLING",
          });
          console.log("Storefront API products received:", storefrontProducts?.length || 0);
          allTransformedFlavors = transformProductsToFlavors(storefrontProducts);
        }

        console.log("Total transformed flavors:", allTransformedFlavors?.length || 0);
        setAllProducts(allTransformedFlavors);

        // Filter to show ONLY edible products
        let filteredFlavors = allTransformedFlavors.filter((flavor) => {
          const tags = (flavor.tags || []).map((tag: string) => tag.toLowerCase());

          // Look for exact 'edible' tag match
          const hasEdibleTag = tags.some((tag: string) => tag === "edible");

          console.log(`Product: ${flavor.title}, Tags: ${JSON.stringify(flavor.tags)}, Has Edible Tag: ${hasEdibleTag}`);
          return hasEdibleTag;
        });

        // If no real edible products found, create placeholder edibles
        if (filteredFlavors.length === 0) {
          console.log("No real edible products found, creating placeholders");
          const mockEdibles = [
            {
              title: "Honey Gummies",
              description: "Delicious honey-flavored gummies with 10mg THC each.",
              shortDescription: "Sweet honey gummies with precise dosing.",
              showBestSellerTag: true,
              tags: ["edible", "Cannabis Infused", "10mg THC", "Natural Honey"],
              productType: "Edible",
              vendor: "LOONER",
              category: { name: "Edibles" },
              bgColor: "bg-yellow-100",
              primaryColor: "#FEF3C7",
              secondaryColor: "#FCD34D",
              images: ["🍯"],
              variants: [
                { id: "mock-honey-gummies-10", title: "10 Pack", price: 25.99, availableForSale: true, selectedOptions: [] }
              ],
            },
            {
              title: "Dark Chocolate Squares",
              description: "Rich dark chocolate squares infused with premium THC.",
              shortDescription: "Premium dark chocolate with THC.",
              showBestSellerTag: false,
              tags: ["edible", "Cannabis Infused", "5mg THC", "Dark Chocolate"],
              productType: "Edible",
              vendor: "LOONER",
              category: { name: "Edibles" },
              bgColor: "bg-amber-100",
              primaryColor: "#D97706",
              secondaryColor: "#F59E0B",
              images: ["🍫"],
              variants: [
                { id: "mock-chocolate-squares-20", title: "20 Pack", price: 45.99, availableForSale: true, selectedOptions: [] }
              ],
            },
            {
              title: "Mixed Berry Gummies",
              description: "Assorted berry flavors in perfectly dosed gummy form.",
              shortDescription: "Mixed berry gummies with THC.",
              showBestSellerTag: false,
              tags: ["edible", "Cannabis Infused", "10mg THC", "Berry Mix"],
              productType: "Edible",
              vendor: "LOONER",
              category: { name: "Edibles" },
              bgColor: "bg-purple-100",
              primaryColor: "#8B5CF6",
              secondaryColor: "#A78BFA",
              images: ["🫐"],
              variants: [
                { id: "mock-berry-gummies-10", title: "10 Pack", price: 28.99, availableForSale: true, selectedOptions: [] }
              ],
            }
          ];
          filteredFlavors = mockEdibles;
          console.log("Using placeholder edibles:", filteredFlavors.length);
        } else {
          console.log("Found real edible flavors:", filteredFlavors.length);
        }

        setFlavors(filteredFlavors);

        const defaultFlavor = filteredFlavors.find(
          (f) => f.title.toLowerCase().replace(/\s+/g, "-") === slug,
        ) || filteredFlavors[0];

        if (defaultFlavor) {
          setSelectedFlavor(defaultFlavor);
          if (defaultFlavor.variants && defaultFlavor.variants.length > 0) {
            setSelectedVariant(defaultFlavor.variants[0]);
            console.log("Setting default variant:", defaultFlavor.variants[0]);
          } else {
            console.error("No variants found for default flavor:", defaultFlavor.title);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading edible flavors:", error);
        setLoading(false);
      }
    }

    loadFlavors();
  }, [slug]);

  // Variety packs filtering for edibles page - look for edible bundles
  const varietyPacks = allProducts.filter((f) => {
    const title = f.title.toLowerCase();
    const tags = (f.tags || []).map((tag: string) => tag.toLowerCase());
    const hasEdible = tags.some((tag: string) => tag.includes("edible"));
    const hasBundle = tags.some((tag: string) => tag.includes("bundle")) || title.includes("variety") || title.includes("mix");
    return hasEdible && hasBundle;
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
            Edible products unavailable
          </h1>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="relative overflow-hidden min-h-screen transition-all duration-500">
        <FlavorBackground color={selectedFlavor?.primaryColor || "#FEF3C7"} />

      <div className="relative z-10">
        {/* Mobile Title - Only visible on mobile, positioned at very top */}
        <div className="lg:hidden px-4 pt-4 pb-6">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">
            {selectedFlavor?.displayName || selectedFlavor?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedFlavor?.shortDescription || selectedFlavor?.description || "Premium cannabis edibles."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-8 py-4 lg:py-6 px-4 lg:px-6 max-w-[1400px] mx-auto">
          {/* Left Column: Product Display */}
          <div className="order-2 lg:order-1">
            <OlipopStyleGrid
              selectedFlavor={selectedFlavor}
            />
          </div>

          {/* Right Column: Product Info & Selection */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            {/* Desktop Title - Only visible on desktop */}
            <div className="hidden lg:block">
              <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-3">
                {selectedFlavor?.displayName || selectedFlavor?.title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-6">
                {selectedFlavor?.shortDescription || selectedFlavor?.description || "Premium cannabis edibles."}
              </p>
            </div>

            {/* Flavor Picker with Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <FlavorPickerVariants
                flavors={allProducts}
                selectedFlavor={selectedFlavor}
                onFlavorSelect={(flavor) => {
                  setSelectedFlavor(flavor);
                  if (flavor.variants && flavor.variants.length > 0) {
                    setSelectedVariant(flavor.variants[0]);
                  }
                }}
                variant="olipop"
              />
            </div>

            {/* Purchase Options */}
            <div ref={purchaseButtonRef}>
              <PurchaseOptions
                flavor={selectedFlavor}
                variant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </div>
          </div>
        </div>

        {/* Product Information Wave Section */}
        <div className="relative">
          {/* Top Waves */}
          <div className="w-full overflow-hidden">
            <svg
              className="relative block w-full h-16"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                fill="white"
              ></path>
            </svg>
          </div>

          {/* Main Information Section */}
          <div
            className="py-12 lg:py-16"
            style={{
              backgroundColor: selectedFlavor?.secondaryColor || "#FCD34D",
            }}
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Product Description */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Premium Cannabis Edibles
                  </h2>
                  <div className="prose prose-lg text-gray-700 mb-8">
                    <p>
                      {selectedFlavor?.description ||
                        "Our premium cannabis edibles are crafted with precision and care, delivering consistent effects and exceptional taste. Each product is lab-tested for potency and purity."}
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                      <strong>Ingredients:</strong> Organic cane sugar, natural flavors, 
                      cannabis extract (THC), citric acid, natural coloring, and premium 
                      ingredients specific to each product type.
                    </p>
                  </div>
                </div>

                {/* Edibles Information */}
                <div
                  className="bg-white p-6 rounded-xl border-2 border-gray-300"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  <div className="text-center border-b-4 border-amber-600 pb-2 mb-4">
                    <h3 className="text-2xl font-bold text-amber-700">Edibles</h3>
                    <p className="text-sm text-gray-600">Long-Lasting Effects</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold">Onset Time:</span>
                      <span>30-90 min</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold">Duration:</span>
                      <span>4-8 hours</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold">Experience:</span>
                      <span>Full Body</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold">Best For:</span>
                      <span>Sleep & Pain</span>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg mt-4">
                      <p className="text-xs text-amber-800 font-medium">
                        <strong>Start Low, Go Slow:</strong> Edibles take longer to take 
                        effect. Wait at least 2 hours before consuming more.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-12">
                {[
                  { icon: "🍯", label: "Natural" },
                  { icon: "⏰", label: "Long Lasting" },
                  { icon: "🧪", label: "Lab Tested" },
                  { icon: "🌿", label: "Organic" },
                  { icon: "🎯", label: "Precise Dose" },
                  { icon: "✨", label: "Premium Quality" },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <p className="text-sm font-medium text-gray-700">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Waves */}
          <div className="w-full overflow-hidden">
            <svg
              className="relative block w-full h-16"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V24.2C1132.19,1.08,1055.71,8.69,985.66,27.17Z"
                fill={selectedFlavor?.secondaryColor || "#FCD34D"}
              ></path>
            </svg>
          </div>
        </div>

        {/* Recommended Flavors */}
        <div className="py-12 lg:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <RecommendedFlavors
              allFlavors={flavors}
              currentFlavor={selectedFlavor}
              onSelectFlavor={(flavor) => {
                setSelectedFlavor(flavor);
                if (flavor.variants && flavor.variants.length > 0) {
                  setSelectedVariant(flavor.variants[0]);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Sticky Cart Footer */}
      <StickyCartFooter
        cart={cart}
        isMainButtonVisible={isPurchaseButtonVisible}
        merchandiseId={selectedVariant?.id || selectedFlavor?.variants?.[0]?.id || ''}
        productTitle={selectedFlavor?.title || ''}
        productPrice={`$${selectedVariant?.price || selectedFlavor?.variants?.[0]?.price || '25.99'}`}
        productImage={selectedFlavor?.images?.[0]}
      />
    </main>
    </>
  );
}

// Main export component with Suspense boundary
export default function EdiblesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading edible products...</p>
        </div>
      </div>
    }>
      <EdiblesPageContent />
    </Suspense>
  );
}