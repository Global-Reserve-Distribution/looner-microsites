import {
  TopBanner,
  CartIndicator,
  PageTitle,
  ProductImageSection,
  PurchaseOptions,
  QuantitySelector,
  AddToCartButton,
  VarietyPacksSection,
  NutritionFacts,
  ProductDescription,
  FeatureIcons,
  YouMayAlsoLike,
  Footer,
  // New Figma-based components
  ProductImageGallery,
  NutritionPanel,
  IngredientIcons,
  ReviewsSummary,
  BrandStorySection,
  LocalSourcingSection,
  RelatedFlavors
} from '../../components/product-page';
import { FlavorPickerVariants } from '../../components/FlavorPickerVariants';
import { InteractiveFlavorSelector } from '../../components/product/interactive-flavor-selector';

export default function ComponentDemo() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        <h1 className="text-3xl font-bold text-center mb-8">Component Demo Page</h1>
        
        {/* TopBanner */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">TopBanner Component</h2>
          <TopBanner />
        </section>

        {/* CartIndicator */}
        <section className="border border-gray-200 p-4 rounded-lg relative">
          <h2 className="text-xl font-semibold mb-4">CartIndicator Component</h2>
          <div className="h-16 bg-gray-50 relative">
            <CartIndicator />
          </div>
        </section>

        {/* PageTitle */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">PageTitle Component</h2>
          <PageTitle title="10mg Soda Products" subtitle="Perfect 10mg THC soda." />
        </section>

        {/* ProductImageSection */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">ProductImageSection Component</h2>
          <ProductImageSection 
            imageUrl="https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292"
            productTitle="10mg Sparkling Lemonades"
          />
        </section>

        {/* Existing FlavorPickerVariants */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Existing FlavorPickerVariants Component</h2>
          <FlavorPickerVariants 
            flavors={[
              { name: 'Half & Half', color: '#f4d03f' },
              { name: 'Peach Lemonade', color: '#f8c471' },
              { name: 'Classic Lemonade', color: '#f7dc6f' },
              { name: 'Pink Lemonade', color: '#f1948a' }
            ]}
            selectedFlavor={{ name: 'Half & Half', color: '#f4d03f' }}
            onFlavorSelect={() => {}}
            variant="premium"
          />
        </section>

        {/* Existing InteractiveFlavorSelector */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Existing InteractiveFlavorSelector Component</h2>
          <InteractiveFlavorSelector 
            products={[]}
            selectedProductTitle="Orange Cream"
          />
        </section>

        {/* PurchaseOptions */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">PurchaseOptions Component</h2>
          <PurchaseOptions />
        </section>

        {/* QuantitySelector */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">QuantitySelector Component</h2>
          <QuantitySelector />
        </section>

        {/* AddToCartButton */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">AddToCartButton Component</h2>
          <AddToCartButton />
        </section>

        {/* VarietyPacksSection */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">VarietyPacksSection Component</h2>
          <VarietyPacksSection />
        </section>

        {/* NutritionFacts */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">NutritionFacts Component</h2>
          <div className="max-w-md">
            <NutritionFacts />
          </div>
        </section>

        {/* ProductDescription */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">ProductDescription Component</h2>
          <ProductDescription />
        </section>

        {/* FeatureIcons */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">FeatureIcons Component</h2>
          <FeatureIcons />
        </section>

        {/* YouMayAlsoLike */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">YouMayAlsoLike Component</h2>
          <YouMayAlsoLike />
        </section>

        {/* Footer */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Footer Component</h2>
          <Footer />
        </section>

        {/* NEW FIGMA-BASED COMPONENTS */}
        <div className="border-t-4 border-orange-400 pt-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-orange-600">New Figma-Based Components</h1>
        </div>

        {/* ProductImageGallery */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">ProductImageGallery Component</h2>
          <ProductImageGallery 
            images={[
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313",
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336"
            ]}
          />
        </section>

        {/* NutritionPanel */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">NutritionPanel Component</h2>
          <NutritionPanel src="https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292" />
        </section>

        {/* IngredientIcons */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">IngredientIcons Component</h2>
          <IngredientIcons 
            icons={[
              { label: "Plant-Based", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292" },
              { label: "Low Sugar", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313" },
              { label: "No Gluten", icon: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336" }
            ]}
          />
        </section>

        {/* ReviewsSummary */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">ReviewsSummary Component</h2>
          <ReviewsSummary 
            reviews={[
              { name: "Taylor", rating: 5, quote: "Obsessed with this flavor. Perfect balance of THC and taste!" },
              { name: "Alex", rating: 4, quote: "Refreshing and light. Great for social occasions." },
              { name: "Jordan", rating: 5, quote: "Best cannabis beverage I've tried. Will definitely reorder." },
              { name: "Casey", rating: 4, quote: "Love the natural ingredients. Clean buzz without the crash." }
            ]}
            averageRating={4.9}
          />
        </section>

        {/* BrandStorySection */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">BrandStorySection Component</h2>
          <BrandStorySection />
        </section>

        {/* LocalSourcingSection */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">LocalSourcingSection Component</h2>
          <LocalSourcingSection 
            images={[
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292",
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313", 
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336",
              "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292"
            ]}
          />
        </section>

        {/* RelatedFlavors */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">RelatedFlavors Component</h2>
          <RelatedFlavors 
            products={[
              { 
                name: "Sweet Orange", 
                slug: "sweet-orange", 
                image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Looner_Classic_Lemonade_Mockup.png?v=1753176292" 
              },
              { 
                name: "Lime Mint", 
                slug: "lime-mint", 
                image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/LoonerGrape50mg.png?v=1753176313" 
              },
              { 
                name: "Cherry Cola", 
                slug: "cherry-cola", 
                image: "https://cdn.shopify.com/s/files/1/0770/5513/1883/files/Canna_Express_Mango-Website.png?v=1753176336" 
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}