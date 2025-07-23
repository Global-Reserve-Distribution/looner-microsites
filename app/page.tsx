import Image from 'next/image';
import Link from 'next/link';
import { HeroButtons } from 'components/landing/hero-buttons';
import { ProductCard } from 'components/landing/product-card';

export const metadata = {
  title: 'LOONER THC Beverages - Premium Cannabis Drinks',
  description: 'Discover LOONER\'s premium line of cannabis-infused beverages. Refreshing, consistent, and crafted for the perfect experience.',
  openGraph: {
    type: 'website',
    title: 'LOONER THC Beverages - Premium Cannabis Drinks',
    description: 'Premium cannabis-infused beverages crafted for the perfect experience.'
  }
};

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cannabis-50 to-cannabis-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cannabis-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8Z" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#cannabis-pattern)"/>
        </svg>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-cannabis-900 mb-6 tracking-tight">
          LOONER
        </h1>
        <p className="text-2xl md:text-3xl text-cannabis-700 mb-8 font-light">
          Premium Cannabis Beverages
        </p>
        <p className="text-lg md:text-xl text-cannabis-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Refreshing, consistent, and crafted for the perfect experience. 
          Discover our line of premium THC-infused beverages.
        </p>
        <HeroButtons />
      </div>
    </section>
  );
}

// Product Showcase Component
function ProductShowcase() {
  const products = [
    {
      name: "Citrus Burst",
      thc: "5mg",
      flavor: "Zesty Orange & Lime",
      color: "from-orange-400 to-yellow-500",
      image: "/placeholder-citrus.jpg"
    },
    {
      name: "Berry Bliss", 
      thc: "10mg",
      flavor: "Mixed Berry Fusion",
      color: "from-purple-500 to-pink-500",
      image: "/placeholder-berry.jpg"
    },
    {
      name: "Tropical Wave",
      thc: "2.5mg",
      flavor: "Pineapple & Mango",
      color: "from-emerald-400 to-teal-500",
      image: "/placeholder-tropical.jpg"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Our Signature Flavors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each LOONER beverage is carefully crafted with premium ingredients and precisely dosed THC 
            for a consistent, enjoyable experience every time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              name={product.name}
              thc={product.thc}
              flavor={product.flavor}
              color={product.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: "🧪",
      title: "Lab Tested",
      description: "Every batch is rigorously tested for potency, purity, and consistency"
    },
    {
      icon: "🌿", 
      title: "Natural Ingredients",
      description: "Made with organic, natural flavors and high-quality cannabis extracts"
    },
    {
      icon: "⚡",
      title: "Fast Acting",
      description: "Nano-emulsion technology for effects you can feel in 15-30 minutes"
    },
    {
      icon: "🎯",
      title: "Precise Dosing", 
      description: "Consistent THC levels in every can for predictable experiences"
    }
  ];

  return (
    <section id="features" className="py-20 bg-cannabis-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-cannabis-900 mb-6">
            Why Choose LOONER?
          </h2>
          <p className="text-xl text-cannabis-700 max-w-3xl mx-auto">
            We're committed to delivering the highest quality cannabis beverages 
            with transparency, consistency, and exceptional taste.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Call to Action Section
function CTASection() {
  return (
    <section className="py-20 bg-cannabis-800 text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Experience LOONER?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Find LOONER beverages at dispensaries near you or learn more about our story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-cannabis-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Find Near You
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">LOONER</h3>
          <p className="text-gray-400 mb-6">Premium Cannabis Beverages</p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-500">
              © 2025 LOONER. All rights reserved. | 21+ Only | Please consume responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}