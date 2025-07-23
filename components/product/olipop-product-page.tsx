'use client';

import { Product } from 'lib/shopify/types';
import { ProductProvider } from 'components/product/product-context';
import FlavorSelectorGridServer from './flavor-selector-grid-server';
import StickyProductPanel from './sticky-product-panel';
import ProductHeroSection from './product-hero-section';
import THCContentBadge from './thc-content-badge';

interface OlipopProductPageProps {
  product: Product;
}

export default function OlipopProductPage({ product }: OlipopProductPageProps) {
  // Extract THC content from product tags for badge display
  const extractTHCContent = () => {
    const thcTag = product.tags.find(tag => tag.includes('THC'));
    return thcTag ? parseInt(thcTag.replace(/\D/g, '')) || 5 : 5;
  };

  const thcAmount = extractTHCContent();

  return (
    <ProductProvider>
      <div className="min-h-screen bg-background">
        {/* Main Product Layout - Olipop Style */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Product Hero */}
            <div className="space-y-8">
              <ProductHeroSection product={product} />
              
              {/* Product Story Section */}
              <div className="bg-natural-cream rounded-2xl p-8">
                <h3 className="text-xl font-bold text-cannabis-primary mb-4">
                  Our Story
                </h3>
                <div className="prose prose-sm text-text-secondary">
                  <p>
                    {product.description || 
                    'Crafted with premium ingredients and precise THC dosing, our beverages deliver a consistent, enjoyable experience every time. Perfect for relaxation, creativity, or social moments.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Product Panel */}
            <div className="lg:sticky lg:top-8">
              <StickyProductPanel product={product} />
            </div>
          </div>

          {/* Flavor Selector Grid - Full Width */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <FlavorSelectorGridServer 
              activeHandle={product.handle}
              collectionHandle="thc-beverages"
            />
          </div>

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-cannabis-accent rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cannabis-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C12 2 8.5 4 6 8C6 8 8 8.5 12 8C16 8.5 18 8 18 8C15.5 4 12 2 12 2Z"/>
                  <path d="M12 8C12 8 14.5 10 16 14C16 14 14 14.5 12 14C10 14.5 8 14 8 14C9.5 10 12 8 12 8Z"/>
                  <path d="M12 14C12 14 11.5 16 12 20C12.5 16 12 14 12 14Z"/>
                </svg>
              </div>
              <h4 className="font-bold text-cannabis-primary">All Natural</h4>
              <p className="text-text-secondary text-sm">
                Made with organic ingredients and natural flavors
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-cannabis-accent rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cannabis-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-cannabis-primary">Lab Tested</h4>
              <p className="text-text-secondary text-sm">
                Third-party tested for purity and potency
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-cannabis-accent rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cannabis-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-cannabis-primary">Fast Acting</h4>
              <p className="text-text-secondary text-sm">
                Effects typically felt within 15-30 minutes
              </p>
            </div>
          </div>

          {/* Dosage Information Panel */}
          <div className="mt-16 bg-gradient-to-r from-cannabis-primary to-cannabis-light rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Dosage Guide</h3>
                  <p className="text-cannabis-accent text-lg mb-4">
                    Start low, go slow. Find your perfect dose.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Beginner:</strong> 2.5-5mg THC</p>
                    <p><strong>Experienced:</strong> 5-15mg THC</p>
                    <p><strong>High Tolerance:</strong> 15mg+ THC</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <THCContentBadge 
                    thcAmount={thcAmount}
                    className="bg-white/20 backdrop-blur"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12 text-center text-xs text-text-secondary border-t pt-8">
            <p className="max-w-2xl mx-auto">
              🔞 <strong>For adults 21+ only.</strong> This product has not been evaluated by the FDA. 
              Keep out of reach of children and pets. Do not drive or operate machinery after use. 
              Use responsibly and in accordance with state and local laws.
            </p>
          </div>
        </div>
      </div>
    </ProductProvider>
  );
}