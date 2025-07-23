import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import '../../globals.css';

export const metadata = {
  title: 'LOONER THC Beverages - Flavor Selection',
  description: 'Discover premium cannabis-infused beverages with natural flavors and precise dosing.',
  robots: {
    follow: true,
    index: true
  }
};

export default function FlavorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-black selection:bg-cannabis-300 antialiased">
        {children}
        <Toaster closeButton />
      </body>
    </html>
  );
}