import { Suspense } from 'react';
import { getCollections, getProducts } from 'lib/shopify';
import ShopGrid from 'components/shop/ShopGrid';
import ShopHero from 'components/shop/ShopHero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All LOONER Cannabis Beverages & Gummies | Premium THC Products',
  description: 'Browse our complete collection of premium cannabis-infused beverages and gummies. THC sodas, sparkling drinks, and artisanal edibles crafted for the perfect experience.',
  openGraph: {
    title: 'Shop All LOONER Cannabis Products',
    description: 'Premium THC beverages and gummies with lab-tested quality and natural ingredients.',
    type: 'website',
  },
};

export default async function ShopPage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({})
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ShopHero />
      
      {/* Product Collections Grid */}
      <section className="bg-[#fff7e5] py-8">
        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ShopGrid products={products} collections={collections} />
        </Suspense>
      </section>
    </main>
  );
}