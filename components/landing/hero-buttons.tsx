'use client';

export function HeroButtons() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button 
        onClick={() => scrollToSection('products')}
        className="bg-cannabis-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cannabis-700 transition-colors"
      >
        Explore Flavors
      </button>
      <button 
        onClick={() => scrollToSection('features')}
        className="border-2 border-cannabis-600 text-cannabis-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cannabis-50 transition-colors"
      >
        Learn More
      </button>
    </div>
  );
}