import FigmaHeaderWrapper from '../FigmaHeaderWrapper';
import Footer from './footer';

export default async function LayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/lake-background-figma.png')"
      }}
    >
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <FigmaHeaderWrapper />
      </div>
      <main className="pt-[70px] relative">
        <div className="bg-white/20 backdrop-blur-sm min-h-screen">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}