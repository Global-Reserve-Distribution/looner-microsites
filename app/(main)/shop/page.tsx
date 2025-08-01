import { Metadata } from 'next';
import { fetchCollectionProducts, fetchProducts } from '../../../lib/shopify/server-actions';
import ShopHero from '../../../components/shop/ShopHero';
import ShopGrid from '../../../components/shop/ShopGrid';

export const metadata: Metadata = {
  title: 'Shop All Products - LOONER Cannabis Beverages & Edibles',
  description: 'Browse our complete collection of premium THC-infused sodas and gummies. Find your perfect flavor with precise dosing from 5mg to 50mg THC.',
  keywords: 'THC beverages, cannabis sodas, THC gummies, edibles, LOONER, shop all',
  openGraph: {
    title: 'Shop All Products - LOONER Cannabis Beverages & Edibles',
    description: 'Browse our complete collection of premium THC-infused sodas and gummies. Find your perfect flavor with precise dosing from 5mg to 50mg THC.',
    type: 'website',
  },
};



export default async function ShopPage() {
  // Fetch real products from Shopify collections
  try {
    const [beverageProducts, gummyProducts, allProducts] = await Promise.all([
      fetchCollectionProducts('thc-sodas').catch(() => []),
      fetchCollectionProducts('edibles').catch(() => []), 
      fetchProducts({ sortKey: 'BEST_SELLING' }).catch(() => [])
    ]);

    // Use all products as fallback if specific collections are empty
    const sodas = beverageProducts.length > 0 ? beverageProducts : 
      allProducts.filter(p => p.tags.some(tag => tag.toLowerCase().includes('soda')));
    const gummies = gummyProducts.length > 0 ? gummyProducts : 
      allProducts.filter(p => p.tags.some(tag => tag.toLowerCase().includes('edible')));

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fff7e5' }}>
        <ShopHero />
        <ShopGrid 
          beverageProducts={sodas}
          gummyProducts={gummies}
          allProducts={allProducts}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching shop products:', error);
    
    // Fallback error state
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fff7e5' }}>
        <ShopHero />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Unable to load products
          </h2>
          <p className="text-gray-600">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }
}