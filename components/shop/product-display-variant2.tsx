'use client';

import type { Product } from '../../lib/shopify/types';

interface ProductDisplayVariant2Props {
  products: Product[];
  title: string;
}

export function ProductDisplayVariant2({ products, title }: ProductDisplayVariant2Props) {
  const getThcContent = (product: Product) => {
    const thcMatch = (product.title + ' ' + product.description)
      .match(/(\d+\.?\d*)\s*mg\s*(thc|THC)/i);
    
    return thcMatch ? `${thcMatch[1]}mg` : '5mg';
  };

  const getBgColor = (index: number) => {
    const bgColors = [
      'bg-amber-50', 'bg-orange-50', 'bg-purple-50', 'bg-red-50', 
      'bg-green-50', 'bg-blue-50', 'bg-pink-50', 'bg-yellow-50'
    ];
    return bgColors[index % bgColors.length];
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-cannabis-800 mb-6">
            {title}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.handle} className={`${getBgColor(index)} rounded-2xl p-6 text-center group hover:shadow-2xl transition-all duration-300`}>
              {/* Circular Product Display */}
              <div className="w-32 h-32 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {product.featuredImage ? (
                  <img 
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-20 h-28 rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <div className="w-20 h-28 rounded-lg bg-gradient-to-b from-cannabis-400 to-cannabis-600 relative shadow-md">
                    <div className="absolute inset-2 border border-white/50 rounded-md flex flex-col items-center justify-center text-white text-xs">
                      <div className="font-bold">L</div>
                      <div className="text-[8px]">{getThcContent(product)}</div>
                    </div>
                  </div>
                )}
              </div>

              <h4 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h4>
              <p className="text-cannabis-600 font-semibold mb-3">{getThcContent(product)} THC</p>
              
              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              
              <div className="mb-4">
                <span className="text-lg font-bold text-gray-800">
                  ${product.priceRange.minVariantPrice.amount}
                </span>
              </div>
              
              <button className="bg-white border border-cannabis-300 text-cannabis-600 px-4 py-2 rounded-full hover:bg-cannabis-50 transition-colors text-sm w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}