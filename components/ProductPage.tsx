"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FlavorPickerVariants } from "./FlavorPickerVariants";
import { PurchaseOptions } from "./PurchaseOptions";
import { PurchaseOptionsNew } from "./PurchaseOptionsNew";
import { FlavorBackground } from "./FlavorBackground";
import { OlipopStyleGrid } from "./OlipopStyleGrid";
import { RecommendedFlavors } from "./RecommendedFlavors";
import { StickyCartFooter } from "./StickyCartFooter";
import { IconicFlavorsBadges } from "./IconicFlavorsBadges";
import FigmaIngredientsSection from "./FigmaIngredientsSection";
import ReviewsSection from "./ReviewsSection";
import { ProductHeader } from "./ProductHeader";

import {
  fetchProducts,
  fetchProductsWithAdminCategories,
} from "../lib/shopify/server-actions";
import { useCart } from "../hooks/useCart";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
}

function getTagEmoji(tag: string): string {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes("cannabis") || tagLower.includes("infused")) return "🌿";
  if (tagLower.includes("gummy") || tagLower.includes("gummies")) return "🍯";
  if (tagLower.includes("chocolate")) return "🍫";
  if (tagLower.includes("cookie")) return "🍪";
  if (tagLower.includes("brownie")) return "🧁";
  if (tagLower.includes("made") || tagLower.includes("cane")) return "🎯";
  if (tagLower.includes("iconic") || tagLower.includes("flavor")) return "⭐";
  if (tagLower.includes("made in") || tagLower.includes("minnesota")) return "📍";
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

  const primaryColorField = metafields.find(
    (field: any) => field && field.key === "primary_color" && field.namespace === "custom"
  );
  const secondaryColorField = metafields.find(
    (field: any) => field && field.key === "secondary_color" && field.namespace === "custom"
  );
  const displayNameField = metafields.find(
    (field: any) => field && field.key === "display_name" && field.namespace === "custom"
  );
  const shortDescriptionField = metafields.find(
    (field: any) => field && field.key === "short_description" && field.namespace === "custom"
  );
  const showBestSellerTagField = metafields.find(
    (field: any) => field && field.key === "show_best_seller_tag" && field.namespace === "custom"
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
function transformAdminProductsToFlavors(products: any[], config: ProductPageConfig) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription, showBestSellerTag } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
      showBestSellerTag: showBestSellerTag,
      tags: product.tags || getDefaultTags(config.productType),
      productType: product.productType || "",
      vendor: product.vendor || "",
      category: product.category || null,
      bgColor: primaryColor ? `bg-[${primaryColor}]` : getFlavorBgClass(product.title, index),
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      images: [
        product.featuredImage?.url || "",
        ...(product.images?.edges || []).slice(0, 3).map((edge: any) => edge.node.url),
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
function transformProductsToFlavors(products: any[], config: ProductPageConfig) {
  return products.map((product, index) => {
    const { primaryColor, secondaryColor, displayName, shortDescription, showBestSellerTag } = extractMetafields(product);

    return {
      title: displayName && displayName.trim() !== "" ? displayName : product.title,
      description: product.description || "",
      shortDescription: shortDescription || null,
      showBestSellerTag: showBestSellerTag,
      tags: product.tags || getDefaultTags(config.productType),
      productType: product.productType || "",
      vendor: product.vendor || "",
      category: null,
      bgColor: primaryColor ? `bg-[${primaryColor}]` : getFlavorBgClass(product.title, index),
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

function getDefaultTags(productType: string): string[] {
  switch (productType) {
    case 'soda-10mg':
    case 'soda-50mg':
      return ["Cannabis Infused", "Made with Cane Sugar", "Made in Minnesota", "High Quality"];
    case 'edibles':
    case 'gummies':
      return ["Cannabis-Infused Edible", "Precise Dosing", "Made in Minnesota", "High Quality"];
    default:
      return ["Cannabis Infused", "High Quality"];
  }
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
    "bg-purple-100", "bg-orange-100", "bg-red-100", "bg-pink-100",
    "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-lime-100",
  ];
  return colors[index % colors.length] || "bg-purple-100";
}

// Product filtering logic
function filterProducts(products: any[], config: ProductPageConfig) {
  return products.filter((flavor) => {
    const tags = (flavor.tags || []).map((tag: string) => tag.toLowerCase());
    const title = flavor.title.toLowerCase();
    const description = (flavor.description || "").toLowerCase();

    // Exclude any products with 'bundle' tag
    const hasBundle = tags.some((tag: string) => tag.includes("bundle"));
    if (hasBundle) {
      console.log(`Product: ${flavor.title} excluded (has bundle tag)`);
      return false;
    }

    switch (config.productType) {
      case 'soda-10mg':
        const hasSodaTag = tags.some((tag: string) => tag.includes("soda"));
        const has10mgThc = 
          title.includes("10mg") || title.includes("10 mg") ||
          description.includes("10mg") || description.includes("10 mg") ||
          tags.some((tag: string) => tag.includes("10mg") || tag.includes("10 mg"));
        return hasSodaTag && has10mgThc;

      case 'soda-50mg':
        const hasSodaTag50 = tags.some((tag: string) => tag.includes("soda"));
        const has50mgThc = 
          title.includes("50mg") || title.includes("50 mg") ||
          description.includes("50mg") || description.includes("50 mg") ||
          tags.some((tag: string) => tag.includes("50mg") || tag.includes("50 mg"));
        return hasSodaTag50 && has50mgThc;

      case 'edibles':
      case 'gummies':
        return tags.some((tag: string) => tag === 'edible');

      default:
        return false;
    }
  });
}

// Get placeholder products when no real products found
function getPlaceholderProducts(config: ProductPageConfig) {
  switch (config.productType) {
    case 'edibles':
    case 'gummies':
      return [
        {
          title: "Honey Gummies",
          description: "Delicious honey-flavored gummies infused with premium THC extract. Perfect for precise dosing and discreet consumption.",
          shortDescription: "Sweet honey gummies with precise THC dosing",
          showBestSellerTag: true,
          tags: ["Cannabis-Infused Edible", "Honey Flavored", "Precise Dosing", "High Quality"],
          productType: "Gummies",
          vendor: "LOONER",
          category: "Edibles",
          bgColor: "bg-yellow-100",
          primaryColor: "#FEF3C7",
          secondaryColor: "#FCD34D",
          images: ["🍯"],
          variants: [
            { id: "honey-10mg", title: "10mg", price: 25.99, availableForSale: true, selectedOptions: [] },
            { id: "honey-5mg", title: "5mg", price: 18.99, availableForSale: true, selectedOptions: [] }
          ]
        },
        {
          title: "Dark Chocolate Squares",
          description: "Rich dark chocolate squares infused with high-quality THC. Each square is precisely dosed for consistent effects.",
          shortDescription: "Premium dark chocolate with THC",
          showBestSellerTag: false,
          tags: ["Cannabis-Infused Edible", "Dark Chocolate", "Precise Dosing", "Premium"],
          productType: "Chocolate",
          vendor: "LOONER",
          category: "Edibles",
          bgColor: "bg-amber-100",
          primaryColor: "#92400E",
          secondaryColor: "#F59E0B",
          images: ["🍫"],
          variants: [
            { id: "chocolate-10mg", title: "10mg", price: 28.99, availableForSale: true, selectedOptions: [] },
            { id: "chocolate-5mg", title: "5mg", price: 22.99, availableForSale: true, selectedOptions: [] }
          ]
        },
        {
          title: "Mixed Berry Gummies",
          description: "Assorted berry-flavored gummies with balanced THC content. Made with real fruit flavors for a delicious edible experience.",
          shortDescription: "Mixed berry gummies with THC",
          showBestSellerTag: false,
          tags: ["Cannabis-Infused Edible", "Berry Flavored", "Gummies", "Fruit"],
          productType: "Gummies",
          vendor: "LOONER",
          category: "Edibles",
          bgColor: "bg-pink-100",
          primaryColor: "#EC4899",
          secondaryColor: "#F9A8D4",
          images: ["🫐"],
          variants: [
            { id: "berry-10mg", title: "10mg", price: 24.99, availableForSale: true, selectedOptions: [] },
            { id: "berry-5mg", title: "5mg", price: 19.99, availableForSale: true, selectedOptions: [] }
          ]
        },
        {
          title: "Citrus Sour Belts",
          description: "Tangy citrus sour belts infused with premium THC extract. A perfect balance of sweet and sour for edible enthusiasts.",
          shortDescription: "Tangy citrus sour candy with THC",
          showBestSellerTag: false,
          tags: ["Cannabis-Infused Edible", "Citrus", "Sour Candy", "Tangy"],
          productType: "Candy",
          vendor: "LOONER",
          category: "Edibles",
          bgColor: "bg-yellow-100",
          primaryColor: "#FDE047",
          secondaryColor: "#FACC15",
          images: ["🍋"],
          variants: [
            { id: "citrus-10mg", title: "10mg", price: 26.99, availableForSale: true, selectedOptions: [] },
            { id: "citrus-5mg", title: "5mg", price: 21.99, availableForSale: true, selectedOptions: [] }
          ]
        }
      ];
    default:
      return [];
  }
}

// Component that uses searchParams - needs to be in Suspense
function ProductPageContent({ config }: ProductPageProps) {
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

  useEffect(() => {
    async function loadFlavors() {
      try {
        console.log(`Starting to fetch ${config.productType} products with Admin API...`);

        let allTransformedFlavors: any[] = [];
        try {
          const adminProducts = await fetchProductsWithAdminCategories();
          console.log("Admin API products received:", adminProducts?.length || 0);

          if (adminProducts.length > 0) {
            allTransformedFlavors = transformAdminProductsToFlavors(adminProducts, config);
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
          allTransformedFlavors = transformProductsToFlavors(storefrontProducts, config);
        }

        console.log("Total transformed flavors:", allTransformedFlavors?.length || 0);
        setAllProducts(allTransformedFlavors);

        // Filter products based on config
        let filteredFlavors = filterProducts(allTransformedFlavors, config);

        // If no real products found, add placeholder products
        if (filteredFlavors.length === 0) {
          console.log(`No real ${config.productType} found, adding placeholder products`);
          const placeholderProducts = getPlaceholderProducts(config);
          filteredFlavors = placeholderProducts;
        }

        console.log(`Found ${config.productType} flavors:`, filteredFlavors.length);
        setFlavors(filteredFlavors);

        // More robust URL parameter matching
        const defaultFlavor = slug ? filteredFlavors.find((f) => {
          const flavorSlug = f.title.toLowerCase().replace(/\s+/g, "-");
          const decodedSlug = decodeURIComponent(slug).toLowerCase();
          
          console.log(`Trying to match URL param "${decodedSlug}" with flavor "${f.title}" (slug: "${flavorSlug}")`);
          
          // Try exact match first
          if (flavorSlug === decodedSlug) {
            console.log(`Exact match found: ${f.title}`);
            return true;
          }
          
          // Try matching without dosage info (e.g., "classic-root-beer" matches "classic-root-beer---10mg")
          const slugWithoutDosage = decodedSlug.replace(/---?\d+mg$/, '');
          if (flavorSlug === slugWithoutDosage) {
            console.log(`Match without dosage found: ${f.title}`);
            return true;
          }
          
          // Try partial match at the beginning
          if (decodedSlug.startsWith(flavorSlug)) {
            console.log(`Partial match (slug starts with title): ${f.title}`);
            return true;
          }
          if (flavorSlug.startsWith(decodedSlug)) {
            console.log(`Partial match (title starts with slug): ${f.title}`);
            return true;
          }
          
          // Try matching by display name or title (case insensitive)
          const titleWords = f.title.toLowerCase().split(/\s+/);
          const slugWords = decodedSlug.split(/[-\s]+/);
          
          // Check if the slug contains the main words from the title
          const wordMatch = titleWords.some((word: string) => 
            word.length > 2 && slugWords.some((slugWord: string) => 
              slugWord.includes(word) || word.includes(slugWord)
            )
          );
          
          if (wordMatch) {
            console.log(`Word-based match found: ${f.title}`);
            return true;
          }
          
          return false;
        }) : null;
        
        const selectedFlavor = defaultFlavor || filteredFlavors[0];

        if (selectedFlavor) {
          console.log(`URL parameter "${slug}" matched to flavor: "${selectedFlavor.title}"`);
          setSelectedFlavor(selectedFlavor);
          if (selectedFlavor.variants && selectedFlavor.variants.length > 0) {
            setSelectedVariant(selectedFlavor.variants[0]);
            console.log("Setting default variant:", selectedFlavor.variants[0]);
          } else {
            console.error("No variants found for selected flavor:", selectedFlavor.title);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(`Error loading ${config.productType} flavors:`, error);
        setLoading(false);
      }
    }

    loadFlavors();
  }, [slug, config]);

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
            {config.title} products unavailable
          </h1>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden min-h-screen transition-all duration-500 bg-transparent">

        <div className="relative z-10">
          {/* Mobile Header - Only visible on mobile, positioned at very top */}
          <div className="lg:hidden px-4 pt-4 pb-6">
            <ProductHeader 
              productName={selectedFlavor?.displayName || selectedFlavor?.title || "Sweet Orange"}
              reviewCount={249}
              rating={4.3}
              showSingleFlavorBadge={true}
              primaryColor={selectedFlavor?.primaryColor || "#fba91d"}
              subtitle={config.productType === 'soda-10mg' ? '10mg Soda' : config.productType === 'soda-50mg' ? '50mg Soda' : 'Cannabis Edibles'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-[78px] py-4 lg:py-6 px-4 lg:px-6 max-w-[1425px] mx-auto">
            {/* Left Column: Product Display */}
            <div className="order-1 lg:order-1">
              <OlipopStyleGrid selectedFlavor={selectedFlavor} />
            </div>

            {/* Right Column: Product Info & Selection */}
            <div className="order-2 lg:order-2 space-y-6 lg:space-y-8">
              {/* Product Header with Stars and Badges */}
              <div className="hidden lg:block">
                <ProductHeader 
                  productName={selectedFlavor?.displayName || selectedFlavor?.title || "Sweet Orange"}
                  reviewCount={249}
                  rating={4.3}
                  showSingleFlavorBadge={true}
                  primaryColor={selectedFlavor?.primaryColor || "#fba91d"}
                  subtitle={config.productType === 'soda-10mg' ? '10mg Soda' : config.productType === 'soda-50mg' ? '50mg Soda' : 'Cannabis Edibles'}
                />
              </div>

              {/* Flavor Picker with Tabs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <FlavorPickerVariants
                  flavors={flavors}
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
                <PurchaseOptionsNew
                  flavor={selectedFlavor}
                  variant={selectedVariant}
                  onVariantChange={setSelectedVariant}
                  onAddToCart={(quantity) => {
                    console.log(`Adding ${quantity} items to cart`);
                    // Add to cart logic here
                  }}
                />
              </div>
            </div>
          </div>



          {/* Iconic Flavors Badges */}
          <IconicFlavorsBadges />

          {/* Figma Ingredients Section */}
          <div className="flex justify-center">
            <FigmaIngredientsSection />
          </div>

          {/* Reviews Section */}
          <ReviewsSection />

          {/* Recommended Flavors */}
          <div className="py-8 md:py-12 lg:py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
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
          productPrice={`$${selectedVariant?.price || selectedFlavor?.variants?.[0]?.price || '35.99'}`}
          productImage={selectedFlavor?.images?.[0]}
        />
    </main>
  );
}

// Main export component with Suspense boundary
export default function ProductPage({ config }: ProductPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading {config.title} products...</p>
        </div>
      </div>
    }>
      <ProductPageContent config={config} />
    </Suspense>
  );
}