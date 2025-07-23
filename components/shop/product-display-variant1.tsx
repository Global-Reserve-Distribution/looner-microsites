'use client';

import type { Product } from '../../lib/shopify/types';

interface ProductDisplayVariant1Props {
  products: Product[];
  title: string;
  description: string;
}

export function ProductDisplayVariant1({ products, title, description }: ProductDisplayVariant1Props) {
  const getThcContent = (product: Product) => {
    // Extract THC content from title or description
    const thcMatch = (product.title + ' ' + product.description)
      .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
    
    return thcMatch ? `${thcMatch[1]}mg` : '5mg';
  };

  const getProductColor = (index: number) => {
    const colors = [
      'from-orange-300 to-orange-500',
      'from-red-400 to-red-600', 
      'from-pink-300 to-pink-500',
      'from-blue-300 to-blue-500',
      'from-purple-300 to-purple-500',
      'from-green-300 to-green-500'
    ];
    return colors[index % colors.length];
  };

  const getBgColor = (index: number) => {
    const bgColors = [
      'bg-orange-200',
      'bg-red-200',
      'bg-pink-200', 
      'bg-blue-200',
      'bg-purple-200',
      'bg-green-200'
    ];
    return bgColors[index % bgColors.length];
  };

  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-cannabis-800 mb-6">
            {title}
          </h3>
          <p className="text-xl text-cannabis-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, index) => (
            <div key={product.handle} className={`${getBgColor(index)} rounded-3xl p-8 text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300`}>
              {/* Decorative Circle */}
              <div className="w-48 h-48 rounded-full bg-white/30 absolute -top-24 -left-24"></div>
              
              {/* Product Image or Can */}
              {product.featuredImage ? (
                <div className="w-32 h-40 mx-auto rounded-lg relative mb-6 shadow-xl overflow-hidden">
                  <img 
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-32 h-40 mx-auto rounded-lg bg-gradient-to-b ${getProductColor(index)} relative mb-6 shadow-xl`}>
                  <div className="absolute inset-4 border-2 border-white/50 rounded-lg flex flex-col items-center justify-center text-white">
                    <div className="text-sm font-bold">LOONER</div>
                    <div className="text-xs mt-2">{getThcContent(product)}</div>
                    <div className="text-xs text-center">{product.title.substring(0, 12)}</div>
                  </div>
                </div>
              )}

              <h4 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h4>
              <p className="text-cannabis-600 font-semibold">{getThcContent(product)} THC</p>
              
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="text-lg font-bold text-gray-800 mb-2">
                  ${product.priceRange.minVariantPrice.amount}
                </div>
                <button className="bg-cannabis-600 text-white px-6 py-2 rounded-full hover:bg-cannabis-700 transition-colors w-full">
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