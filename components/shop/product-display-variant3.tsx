'use client';

import type { Product } from '../../lib/shopify/types';

interface ProductDisplayVariant3Props {
  products: Product[];
  title: string;
}

export function ProductDisplayVariant3({ products, title }: ProductDisplayVariant3Props) {
  const getThcContent = (product: Product) => {
    const thcMatch = (product.title + ' ' + product.description)
      .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
    
    return thcMatch ? `${thcMatch[1]}mg` : '7.5mg';
  };

  const getProductColor = (index: number) => {
    const colors = [
      'from-lime-300 to-lime-600',
      'from-orange-300 to-orange-600',
      'from-purple-300 to-purple-600',
      'from-blue-300 to-blue-600',
      'from-yellow-400 to-orange-500',
      'from-red-400 to-red-600'
    ];
    return colors[index % colors.length];
  };

  const getProductIcon = (product: Product, index: number) => {
    // Try to determine icon from product type or title
    const title = product.title.toLowerCase();
    if (title.includes('lemon') || title.includes('lime')) return '🍋';
    if (title.includes('orange')) return '🍊';
    if (title.includes('berry') || title.includes('grape')) return '🫐';
    if (title.includes('cream')) return '🥛';
    if (title.includes('ginger')) return '⚡';
    if (title.includes('cola') || title.includes('soda')) return '🥤';
    
    const icons = ['🍋', '🍊', '🫐', '🥛', '⚡', '🔥'];
    return icons[index % icons.length];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-cannabis-800 mb-6">
            {title}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, index) => (
            <div key={product.handle} className="bg-white rounded-3xl shadow-xl p-8 text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Large Circular Background */}
              <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${getProductColor(index)} flex items-center justify-center mb-6 relative overflow-hidden`}>
                <div className="absolute inset-8 border-4 border-white/30 rounded-full"></div>
                
                {/* Product Image or Can */}
                {product.featuredImage ? (
                  <img 
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-24 h-32 rounded-lg shadow-lg object-cover relative z-10"
                  />
                ) : (
                  <div className="w-24 h-32 bg-white/90 rounded-lg shadow-lg flex flex-col items-center justify-center relative z-10">
                    <div className="text-2xl mb-1">{getProductIcon(product, index)}</div>
                    <div className="text-xs font-bold text-gray-800">LOONER</div>
                    <div className="text-[10px] text-cannabis-600">{getThcContent(product)}</div>
                  </div>
                )}
              </div>

              <h4 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h4>
              <p className="text-cannabis-600 font-semibold text-lg mb-4">{getThcContent(product)} THC</p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-cannabis-800">
                  ${product.priceRange.minVariantPrice.amount}
                </span>
                <button className="bg-cannabis-600 text-white px-6 py-3 rounded-full hover:bg-cannabis-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}