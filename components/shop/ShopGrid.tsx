'use client';

import { Product, Collection } from 'lib/shopify/types';
import ShopProductCard from './ShopProductCard';
import { useState } from 'react';

interface ShopGridProps {
  products: Product[];
  collections: Collection[];
}

// Color scheme mapping for different product types/collections
const COLLECTION_COLORS = {
  'beverages': '#fee967', // Yellow
  'sodas': '#cae6e8',     // Light blue  
  'sparkling': '#ffc3b3', // Peach
  'gummies': '#ffc1d4',   // Pink
  'edibles': '#ffada5',   // Coral
  'default': '#f3f4f6'    // Light gray
};

const PRODUCT_COLORS = [
  '#fee967', // Banana Cream - Yellow
  '#cae6e8', // Tropical Punch - Light blue
  '#ffc3b3', // Strawberry Vanilla - Peach
  '#ffc1d4', // Cherry Vanilla - Pink
  '#ffada5', // Coral
  '#e0f2e7', // Light green
  '#fef3c7', // Light yellow
  '#ddd6fe', // Light purple
];

export default function ShopGrid({ products, collections }: ShopGridProps) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  // Filter products based on selected collection
  const filteredProducts = selectedCollection
    ? products.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes(selectedCollection.toLowerCase()))
      )
    : products;

  // Group products by collection/type
  const beverageProducts = products.filter(product => 
    product.tags.some(tag => 
      ['beverage', 'soda', 'sparkling', 'drink'].some(term => 
        tag.toLowerCase().includes(term)
      )
    )
  );

  const gummyProducts = products.filter(product =>
    product.tags.some(tag => 
      ['gummy', 'gummies', 'edible', 'edibles'].some(term => 
        tag.toLowerCase().includes(term)
      )
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Collection Filters */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        <button
          onClick={() => setSelectedCollection(null)}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${
            selectedCollection === null
              ? 'bg-[#14433d] text-white'
              : 'bg-white text-[#14433d] border-2 border-[#14433d]'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setSelectedCollection('beverage')}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${
            selectedCollection === 'beverage'
              ? 'bg-[#14433d] text-white'
              : 'bg-white text-[#14433d] border-2 border-[#14433d]'
          }`}
        >
          Beverages ({beverageProducts.length})
        </button>
        <button
          onClick={() => setSelectedCollection('gummy')}
          className={`px-6 py-3 rounded-full font-semibold transition-colors ${
            selectedCollection === 'gummy'
              ? 'bg-[#14433d] text-white'
              : 'bg-white text-[#14433d] border-2 border-[#14433d]'
          }`}
        >
          Gummies ({gummyProducts.length})
        </button>
      </div>

      {/* Beverages Section */}
      {(!selectedCollection || selectedCollection === 'beverage') && beverageProducts.length > 0 && (
        <div className="mb-16">
          <div className="bg-[#edf6f3] rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#14433d] text-center mb-2">
              Cannabis Beverages
            </h2>
            <p className="text-lg text-[#14433d]/70 text-center max-w-2xl mx-auto">
              Premium THC-infused sodas and sparkling beverages crafted for the perfect experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {beverageProducts.map((product, index) => (
              <ShopProductCard
                key={product.id}
                product={product}
                backgroundColor={PRODUCT_COLORS[index % PRODUCT_COLORS.length] || '#f3f4f6'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gummies Section */}
      {(!selectedCollection || selectedCollection === 'gummy') && gummyProducts.length > 0 && (
        <div className="mb-16">
          <div className="bg-[#edf6f3] rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#14433d] text-center mb-2">
              Cannabis Gummies
            </h2>
            <p className="text-lg text-[#14433d]/70 text-center max-w-2xl mx-auto">
              Artisanal THC gummies with precise dosing and natural fruit flavors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gummyProducts.map((product, index) => (
              <ShopProductCard
                key={product.id}
                product={product}
                backgroundColor={PRODUCT_COLORS[(index + 4) % PRODUCT_COLORS.length] || '#f3f4f6'}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Products Grid (when filter is applied) */}
      {selectedCollection && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ShopProductCard
              key={product.id}
              product={product}
              backgroundColor={PRODUCT_COLORS[index % PRODUCT_COLORS.length] || '#f3f4f6'}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            No products found
          </h3>
          <p className="text-gray-500">
            Try selecting a different collection or check back later.
          </p>
        </div>
      )}
    </div>
  );
}