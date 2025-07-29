import Image from 'next/image';
import Link from 'next/link';
import { fetchCollectionProducts, fetchProducts } from '../../../lib/shopify/server-actions';
import { ProductDisplayVariant1 } from '../../../components/shop/product-display-variant1';
import { ProductDisplayVariant2 } from '../../../components/shop/product-display-variant2';
import { ProductDisplayVariant3 } from '../../../components/shop/product-display-variant3';

export const metadata = {
  title: 'Shop - LOONER THC Beverages',
  description: 'Discover our full collection of premium THC-infused beverages. Find your perfect flavor and dosage.',
};

// Nostalgic Hero Section Component
function NostalgicHero() {
  return (
    <section className="relative h-[70vh] bg-gradient-to-br from-orange-200 via-pink-200 to-blue-200 overflow-hidden">
      {/* Beach/Summer Background */}
      <div className="absolute inset-0">
        {/* Sun */}
        <div className="absolute top-8 right-12 w-20 h-20 bg-yellow-300 rounded-full shadow-lg animate-pulse"></div>
        
        {/* Clouds */}
        <div className="absolute top-16 left-1/4 w-24 h-12 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-24 right-1/3 w-32 h-16 bg-white rounded-full opacity-60"></div>
        
        {/* Beach Scene */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-amber-300 to-transparent"></div>
        <div className="absolute bottom-16 left-8 w-16 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-8 h-24 bg-red-400 rotate-12"></div>
      </div>

      {/* Floating People with Beverages */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Person 1 */}
        <div className="absolute left-16 top-1/3 transform -rotate-12">
          <div className="w-32 h-40 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-full relative">
            <div className="w-8 h-8 bg-black rounded-full absolute top-8 left-8 opacity-80"></div>
            <div className="w-20 h-32 bg-gradient-to-b from-cannabis-400 to-cannabis-600 rounded-lg absolute -right-6 top-12 flex items-center justify-center text-white text-xs font-bold">
              LOONER<br/>5mg THC
            </div>
          </div>
        </div>

        {/* Person 2 - Center */}
        <div className="transform rotate-3">
          <div className="w-40 h-48 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full relative">
            <div className="w-10 h-10 bg-black rounded-full absolute top-12 left-12 opacity-80"></div>
            <div className="w-24 h-36 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg absolute -right-8 top-16 flex items-center justify-center text-white text-sm font-bold">
              LOONER<br/>10mg THC<br/>Berry
            </div>
          </div>
        </div>

        {/* Person 3 */}
        <div className="absolute right-20 top-1/4 transform rotate-12">
          <div className="w-36 h-44 bg-gradient-to-b from-amber-300 to-amber-400 rounded-t-full relative">
            <div className="w-10 h-10 bg-black rounded-full absolute top-10 left-10 opacity-80"></div>
            <div className="w-22 h-34 bg-gradient-to-b from-purple-400 to-purple-600 rounded-lg absolute -left-6 top-14 flex items-center justify-center text-white text-xs font-bold">
              LOONER<br/>15mg THC
            </div>
          </div>
        </div>
      </div>

      {/* Logo/Brand */}
      <div className="absolute top-8 left-8">
        <h1 className="text-4xl font-bold text-cannabis-800">LOONER</h1>
        <p className="text-cannabis-600">Premium THC Beverages</p>
      </div>

      {/* Main Title */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-6xl font-bold text-white drop-shadow-lg mb-4">
          Summer Vibes
        </h2>
        <p className="text-xl text-white drop-shadow-md">
          Find your perfect THC beverage for any occasion
        </p>
      </div>
    </section>
  );
}

export default async function ShopPage() {
  // Fetch real products from Shopify collections
  const [thcSodas, edibles, allProducts] = await Promise.all([
    fetchCollectionProducts('thc-sodas').catch(() => []),
    fetchCollectionProducts('edibles').catch(() => []), 
    fetchProducts({ sortKey: 'BEST_SELLING' }).catch(() => [])
  ]);

  // Fallback to all products if collections are empty
  const sodaProducts = thcSodas.length > 0 ? thcSodas : allProducts.slice(0, 8);
  const edibleProducts = edibles.length > 0 ? edibles : allProducts.slice(8, 16);
  const featuredProducts = allProducts.slice(0, 6);

  return (
    <div className="min-h-screen">
      <NostalgicHero />
      <ProductDisplayVariant1 
        products={sodaProducts}
        title="THC Soda Collection"
        description="Premium cannabis-infused sodas with precise THC dosing for the perfect summer experience"
      />
      <ProductDisplayVariant2 
        products={edibleProducts}
        title="Edibles & Treats"
      />
      <ProductDisplayVariant3 
        products={featuredProducts}
        title="Featured Products"
      />
      
      {/* Call to Action */}
      <section className="py-20 bg-cannabis-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Flavor?</h3>
          <p className="text-xl mb-8">Explore our full collection of premium THC beverages crafted for every occasion.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cannabis-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              View All Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors">
              Find a Dispensary
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}