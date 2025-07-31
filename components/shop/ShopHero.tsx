export default function ShopHero() {
  return (
    <section className="bg-[#fff7e5] relative">
      {/* Hero Image/Slideshow Area */}
      <div className="relative w-full h-[740px] overflow-hidden">
        <div 
          className="w-full h-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-6">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Premium Cannabis
                <br />
                <span className="text-green-300">Beverages & Edibles</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-100">
                Crafted for the perfect experience. Lab-tested. Natural ingredients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors">
                  Shop Beverages
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-colors">
                  Shop Gummies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="w-full overflow-hidden">
        <svg
          className="relative block w-full h-10"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#fff7e5"
          />
        </svg>
      </div>
    </section>
  );
}