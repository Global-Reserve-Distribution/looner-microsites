import FigmaHeaderWrapper from '../FigmaHeaderWrapper';
import Footer from './footer';

export default async function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* High-quality SVG background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lake-background-figma.svg')"
        }}
      />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <FigmaHeaderWrapper />
      </div>
      
      {/* Content */}
      <main className="pt-[70px] relative z-10">
        <div className="bg-white/5 min-h-screen">
          <div className="max-w-[1425px] mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}