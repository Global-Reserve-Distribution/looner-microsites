import { fetchProducts } from '../../lib/shopify/server-actions';
import { InteractiveFlavorSelector } from '../../components/product/interactive-flavor-selector';
import { ProductHeroImages } from '../../components/product/product-hero-images';
import { ProductFeatures } from '../../components/product/product-features';
import { ProductPurchasePanel } from '../../components/product/product-purchase-panel';

export const metadata = {
  title: 'LOONER THC Beverages - Interactive Flavor Selection',
  description: 'Explore our full collection of premium THC-infused beverages. Choose your perfect flavor and dosage.',
};

export default async function ProductLandingPage() {
  // Fetch real products for the flavor selector
  const products = await fetchProducts({ sortKey: 'BEST_SELLING' }).catch(() => []);
  
  // Use first product as featured or fallback to default
  const featuredProduct = products[0] || {
    id: 'featured',
    title: 'Orange Cream',
    description: 'Vanilla cream meets bright citrus.',
    handle: 'orange-cream',
    priceRange: { minVariantPrice: { amount: '12.99', currencyCode: 'USD' } },
    featuredImage: null,
    images: [],
    variants: [],
    availableForSale: true,
    options: []
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Product Images */}
          <div className="space-y-6">
            <ProductHeroImages product={featuredProduct} />
          </div>

          {/* Right Side - Product Info & Selector */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">(21)</span>
                <span className="text-sm text-gray-600">Single Flavor</span>
                <span className="text-sm text-gray-600">12 Cans</span>
              </div>
              
              <h1 className="text-5xl font-bold text-cannabis-800 mb-4">
                {featuredProduct.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {featuredProduct.description || 'Premium THC-infused beverage crafted for the perfect experience.'}
              </p>
            </div>

            {/* Product Features */}
            <ProductFeatures />

            {/* Interactive Flavor Selector */}
            <div>
              <div className="flex border-b border-gray-200 mb-6">
                <button className="px-6 py-3 text-lg font-semibold text-cannabis-800 border-b-2 border-cannabis-600">
                  Our Flavors
                </button>
                <button className="px-6 py-3 text-lg text-gray-500">
                  Variety Packs
                </button>
              </div>
              
              <InteractiveFlavorSelector products={products} />
            </div>

            {/* Purchase Panel */}
            <ProductPurchasePanel product={featuredProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}