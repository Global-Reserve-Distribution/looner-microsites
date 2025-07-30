"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { FlavorHero } from "../../components/FlavorHero";
import { LifestyleImageGrid } from "../../components/LifestyleImageGrid";
import { FlavorPickerTabs } from "../../components/FlavorPickerTabs";
import { FlavorPickerVariants } from "../../components/FlavorPickerVariants";
import { PurchaseOptions } from "../../components/PurchaseOptions";
import { FlavorBackground } from "../../components/FlavorBackground";
import { OlipopStyleGrid } from "../../components/OlipopStyleGrid";
import { RecommendedFlavors } from "../../components/RecommendedFlavors";

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
        price: parseFloat(edge.node.price) || 0, // Admin API returns price as string
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

// Component that uses searchParams - needs to be in Suspense
function ProductPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams?.get("flavor");

  const [flavors, setFlavors] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]); // Store complete product list including bundles
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
          console.log("First storefront product full structure:", JSON.stringify(storefrontProducts[0], null, 2));
          allTransformedFlavors =
            transformProductsToFlavors(storefrontProducts);
        }

        console.log(
          "Total transformed flavors:",
          allTransformedFlavors?.length || 0,
        );

        // Store complete product list for variety pack filtering
        setAllProducts(allTransformedFlavors);

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

        if (defaultFlavor) {
          setSelectedFlavor(defaultFlavor);
          // Ensure we have variants before setting
          if (defaultFlavor.variants && defaultFlavor.variants.length > 0) {
            setSelectedVariant(defaultFlavor.variants[0]);
            console.log("Setting default variant:", defaultFlavor.variants[0]);
          } else {
            console.error("No variants found for default flavor:", defaultFlavor.title);
          }
        }
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
    const tags = (f.tags || []).map((tag: string) => tag.toLowerCase());
    const hasSoda = tags.some((tag: string) => tag.includes("soda"));
    // Look for variety/pack/bundle in title OR use first 3 flavors as variety pack examples
    const isVarietyByName = title.includes("variety") || title.includes("pack") || title.includes("bundle") || title.includes("mix");
    return hasSoda && isVarietyByName;
  });
  const regularFlavors = flavors.filter((f) => {
    const tags = (f.tags || []).map((tag: string) => tag.toLowerCase());
    // Exclude bundle items from regular flavors
    return !tags.some((tag: string) => tag.includes("bundle"));
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
      <main className="relative overflow-hidden min-h-screen transition-all duration-500">
        <FlavorBackground color={selectedFlavor?.primaryColor || "#FFE5B4"} />

      <div className="relative z-10">
        {/* Mobile Title - Only visible on mobile, positioned at very top */}
        <div className="lg:hidden px-4 pt-4 pb-6">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">
            {selectedFlavor?.displayName || selectedFlavor?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedFlavor?.shortDescription || selectedFlavor?.description || "The perfect blend of sweet & tart."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-8 py-4 lg:py-6 max-w-7xl mx-auto">
          {/* Left Column - Olipop Style Grid */}
          <div className="space-y-4 lg:space-y-8 px-4 lg:px-0">
            <OlipopStyleGrid selectedFlavor={selectedFlavor} />
          </div>

          {/* Right Column - Product Info & Selection */}
          <div className="space-y-4 lg:space-y-8">
            {/* Desktop Title - Only visible on desktop */}
            <div className="hidden lg:block px-4 lg:px-0">
              <h1 className="text-3xl lg:text-5xl font-serif text-gray-900 mb-2 lg:mb-4">
                {selectedFlavor?.displayName || selectedFlavor?.title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6">
                {selectedFlavor?.shortDescription || selectedFlavor?.description || "The perfect blend of sweet & tart."}
              </p>
            </div>

            <div className="px-4 lg:px-0">
              <FlavorPickerVariants
                flavors={allProducts}
                selectedFlavor={selectedFlavor}
                onFlavorSelect={(flavor) => {
                  setSelectedFlavor(flavor);
                  if (flavor.variants && flavor.variants.length > 0) {
                    setSelectedVariant(flavor.variants[0]);
                    console.log("Flavor selected, set variant:", flavor.variants[0]);
                  } else {
                    console.error("Selected flavor has no variants:", flavor.title);
                  }
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

        {/* Product Information Section - Olipop Style with Wave Transitions */}
        <div className="relative block">
          {/* Top Wave - Mobile */}
          <svg 
            className="block lg:hidden" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none" 
            width="100%" 
            height="21" 
            viewBox="0 0 376 20" 
            fill="none"
          >
            <path 
              d="M188 13.2684C85.1222 -6.73157 0 2.74214 0 2.74214V20.5H376V2.74214C376 2.74214 290.878 33.2684 188 13.2684Z" 
              fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
            />
          </svg>
          
          {/* Top Wave - Desktop */}
          <svg 
            className="hidden lg:block" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none" 
            width="100%" 
            height="60" 
            viewBox="0 0 1440 60" 
            fill="none"
          >
            <path 
              d="M720 38.3053C326 -21.6947 0 6.72642 0 6.72642V60H1440V6.72643C1440 6.72643 1114 98.3053 720 38.3053Z" 
              fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
            />
          </svg>

          {/* Main Content Section with Colored Background */}
          <div 
            className="px-4 lg:px-0"
            style={{ backgroundColor: selectedFlavor?.secondaryColor || '#CCFBF1' }}
          >
            <div className="max-w-7xl mx-auto py-12 lg:py-16 md:py-20 md:pt-32 lg:px-5">
              <div className="flex flex-col flex-wrap justify-between overflow-hidden md:flex-row">
                {/* Product Description - Left Column */}
                <div className="max-w-[630px] flex-1">
                  <h3 className="mb-5 md:mb-9 text-2xl lg:text-3xl font-serif text-gray-900">
                    {selectedFlavor?.displayName || selectedFlavor?.title}
                  </h3>
                  <p className="mb-6 text-base lg:text-lg text-gray-700 leading-relaxed">
                    {selectedFlavor?.description || "Your creamiest, fruitiest strawberry sundae meets bubbly soda. A blend of sweet strawberry juice, rich vanilla, and a dash of tangy lemon create a soda that quenches thirst in the most delightful way."}
                  </p>
                  
                  <p className="mb-4">
                    <strong>Ingredients:</strong> Carbonated water, cane sugar, natural fruit flavors, cannabis extract (THC), citric acid, natural caffeine, vitamin B complex, and LOONER's proprietary blend of adaptogens including ashwagandha and L-theanine.
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    <strong>Nutritional information for our new Pantry Ready version of {selectedFlavor?.displayName || selectedFlavor?.title} can be found here.</strong>
                  </p>
                </div>

                {/* Nutrition Facts Panel - Right Column */}
                <div className="flex justify-center">
                  <section className="w-[250px] font-sans text-sm" aria-label="Nutrition Facts">
                    <div className="text-left text-xl font-black mb-2">
                      Contains 14% Juice
                    </div>
                    <div className="overflow-auto border-2 border-solid border-black p-1">
                      <div className="border-b-[10px] border-solid border-black">
                        <div className="border-b border-solid border-black text-center text-lg font-black leading-7">
                          Nutrition Facts
                        </div>
                        <div className="text-left">1 serving per container</div>
                        <table className="w-full table-auto border-collapse">
                          <tbody>
                            <tr>
                              <th colSpan={2} className="whitespace-nowrap border-0">
                                <b>Serving size</b>
                              </th>
                              <td className="whitespace-nowrap border-0 text-right">
                                <b>1 Can (355mL)</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <table className="w-full table-auto border-collapse mt-2">
                        <thead>
                          <tr>
                            <th colSpan={3} className="whitespace-nowrap border-0 text-xs">Amount per serving</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b-[7px] border-solid border-black">
                            <th colSpan={2} className="whitespace-nowrap border-0 text-lg font-black leading-7">
                              Calories
                            </th>
                            <td className="whitespace-nowrap border-0 text-right text-lg font-black leading-7">
                              45
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="whitespace-nowrap text-right text-xs">
                              <b>% Daily Value*</b>
                            </td>
                          </tr>
                          <tr>
                            <th colSpan={2} className="whitespace-nowrap border-0 border-t border-solid border-black">
                              <b>Total Fat</b> 0g
                            </th>
                            <td className="whitespace-nowrap border-0 border-t border-solid border-black text-right">
                              <b>0%</b>
                            </td>
                          </tr>
                          <tr>
                            <th colSpan={2} className="whitespace-nowrap border-0 border-t border-solid border-black">
                              <b>Sodium</b> 30mg
                            </th>
                            <td className="whitespace-nowrap border-0 border-t border-solid border-black text-right">
                              <b>1%</b>
                            </td>
                          </tr>
                          <tr>
                            <th colSpan={2} className="whitespace-nowrap border-0 border-t border-solid border-black">
                              <b>Total Carbohydrate</b> 16g
                            </th>
                            <td className="whitespace-nowrap border-0 border-t border-solid border-black text-right">
                              <b>6%</b>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-4 border-0 border-t border-solid border-black"></td>
                            <th className="whitespace-nowrap border-0 border-t border-solid border-black">
                              Total Sugars 5g
                            </th>
                            <td className="border-0 border-t border-solid border-black"></td>
                          </tr>
                          <tr className="border-b-[10px] border-solid border-black">
                            <th colSpan={2} className="whitespace-nowrap border-0 border-t border-solid border-black">
                              <b>THC Content</b> 10mg
                            </th>
                            <td className="border-0 border-t border-solid border-black"></td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="mt-1 text-left text-xs leading-tight">
                        Not a significant source of saturated fat, trans fat, cholesterol, vitamin D, calcium, iron, potassium and vitamin A.
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Feature Icons Row */}
              <div className="block w-full py-10 lg:py-12">
                <ul className="grid w-full grid-cols-2 gap-x-2 gap-y-10 lg:flex lg:flex-row">
                  {[
                    { label: 'High Fiber' },
                    { label: 'Less Sugar*' },
                    { label: 'Vegan' },
                    { label: 'Plant Powered' },
                    { label: 'Paleo' },
                    { label: 'Gluten Free' },
                    { label: 'GMO Free' }
                  ].map((feature, index) => (
                    <li key={index} className="flex flex-1 flex-col items-center text-center">
                      <div className="w-15 h-15 bg-white/20 rounded-full flex items-center justify-center mb-5">
                        <span className="text-2xl">
                          {index === 0 && '🌾'}
                          {index === 1 && '🍯'}
                          {index === 2 && '🌱'}
                          {index === 3 && '💚'}
                          {index === 4 && '🦴'}
                          {index === 5 && '🚫'}
                          {index === 6 && '🧬'}
                        </span>
                      </div>
                      <p className="pt-2 text-base font-bold text-gray-900">
                        {feature.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Wave - Mobile */}
          <div style={{ width: '100%', position: 'absolute', zIndex: 2 }}>
            <svg 
              className="block lg:hidden relative -top-px" 
              xmlns="http://www.w3.org/2000/svg" 
              preserveAspectRatio="none" 
              width="100%" 
              height="21" 
              viewBox="0 0 376 20" 
              fill="none"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M52.6963 0.0341797C87.0381 0.0349157 135.179 2.53387 188 12.8026C290.878 32.8026 376 2.27632 376 2.27632V0.0341797H52.6963ZM52.666 0.0341797H0V2.27632C0 2.27632 20.1396 0.0348769 52.666 0.0341797Z" 
                fill={selectedFlavor?.secondaryColor || '#CCFBF1'}
              />
            </svg>
            
            {/* Bottom Wave - Desktop */}
            <svg 
              className="hidden lg:block relative -top-px" 
              xmlns="http://www.w3.org/2000/svg" 
              preserveAspectRatio="none" 
              width="100%" 
              height="60" 
              viewBox="0 0 1440 60" 
              fill="none"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M201.989 0.103754C334.115 0.104868 518.538 7.60306 720 38.4105C1114 98.4105 1440 6.8294 1440 6.8294V0.103754H201.989ZM201.998 0.103754H0V6.8294C0 6.8294 77.1186 0.104612 201.998 0.103754Z" 
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
        merchandiseId={selectedVariant?.id || selectedFlavor?.variants?.[0]?.id || ''}
        productTitle={selectedFlavor?.title || ''}
        productPrice={`$${selectedVariant?.price || selectedFlavor?.variants?.[0]?.price || '35.99'}`}
        productImage={selectedFlavor?.images?.[0]}
      />
    </main>
    </>
  );
}

// Main export component with Suspense boundary
export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading flavors...</p>
        </div>
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}