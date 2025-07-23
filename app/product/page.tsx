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
  
  // Use Cherry Cola as featured product or fallback
  const featuredProduct = products.find(p => p.title.toLowerCase().includes('cherry')) || products[0] || {
    id: 'featured',
    title: 'Cherry Cola',
    description: 'Really cherry.',
    handle: 'cherry-cola',
    priceRange: { minVariantPrice: { amount: '35.99', currencyCode: 'USD' } },
    featuredImage: null,
    images: [],
    variants: [],
    availableForSale: true,
    options: []
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-[45%_55%] gap-16">
          
          {/* Left Side - Product Hero & Features */}
          <div className="flex flex-col gap-6">
            {/* Main Product Image */}
            <div className="bg-gradient-to-br from-pink-100 via-pink-200 to-red-200 rounded-3xl p-12 relative overflow-hidden aspect-[4/5]">
              <div className="absolute inset-0 flex items-center justify-center">
                {featuredProduct.featuredImage?.url ? (
                  <img 
                    src={featuredProduct.featuredImage.url}
                    alt={featuredProduct.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-64 h-80 relative">
                    {/* Can Design */}
                    <div className="w-full h-full bg-gradient-to-b from-red-400 to-red-600 rounded-[40px] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Can Top */}
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 rounded-t-[40px]"></div>
                      
                      {/* Label */}
                      <div className="text-white text-center z-10 px-8">
                        <div className="text-5xl font-bold mb-4">LOONER</div>
                        <div className="text-2xl font-semibold mb-2">Cherry Cola</div>
                        <div className="text-lg">Really cherry.</div>
                        <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-lg font-bold">10mg THC</span>
                        </div>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute top-20 left-8 w-20 h-40 bg-white/10 rounded-full transform rotate-12 blur-xl"></div>
                      
                      {/* Cherry Icon */}
                      <div className="absolute bottom-10 right-10 text-white/20 text-8xl">🍒</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-pink-100 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-pink-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">High Fiber</h3>
                  <p className="text-gray-600 text-sm">9g of fiber per can</p>
                </div>
              </div>
              
              <div className="bg-green-100 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Non GMO</h3>
                  <p className="text-gray-600 text-sm">All natural ingredients</p>
                </div>
              </div>
              
              <div className="bg-yellow-100 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍭</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Less Sugar*</h3>
                  <p className="text-gray-600 text-sm">Only 5g sugar, 35 calories</p>
                </div>
              </div>
            </div>

            {/* Additional Product Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500 rounded-2xl p-8 relative overflow-hidden aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-40 bg-gradient-to-b from-red-400 to-red-600 rounded-[20px] shadow-xl"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">Perfect for any occasion</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 relative overflow-hidden aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-20">🍒</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg font-bold text-center">Real Cherry<br/>Flavor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info & Selector */}
          <div className="flex flex-col gap-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <span>Single Flavor</span>
                <span>•</span>
                <span>12 Cans</span>
              </div>
              
              <h1 className="text-6xl font-bold text-gray-900 mb-3">
                {featuredProduct.title}
              </h1>
              
              <p className="text-2xl text-gray-600">
                {featuredProduct.description}
              </p>
            </div>

            {/* Interactive Flavor Selector */}
            <InteractiveFlavorSelector products={products} selectedProductTitle={featuredProduct.title} />

            {/* Purchase Panel */}
            <ProductPurchasePanel product={featuredProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}