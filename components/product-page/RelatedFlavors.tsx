import Image from 'next/image';
import Link from 'next/link';

interface RelatedProduct {
  name: string;
  slug: string;
  image: string;
}

interface RelatedFlavorsProps {
  products: RelatedProduct[];
}

export default function RelatedFlavors({ products }: RelatedFlavorsProps) {
  return (
    <div className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link 
              key={index} 
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}