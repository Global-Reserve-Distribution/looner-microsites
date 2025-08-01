"use client";

import {
  TopBanner,
  ProductImageGallery,
  NutritionPanel,
  BrandStorySection
} from '../../components/product-page';

export default function WorkingDemo() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        <h1 className="text-3xl font-bold text-center mb-8">Working Component Demo</h1>
        
        {/* TopBanner */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">TopBanner Component</h2>
          <TopBanner />
        </section>

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

        {/* BrandStorySection */}
        <section className="border border-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">BrandStorySection Component</h2>
          <BrandStorySection />
        </section>
      </div>
    </div>
  );
}