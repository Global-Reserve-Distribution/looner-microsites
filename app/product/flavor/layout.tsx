import { Toaster } from 'sonner';

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
    <>
      {children}
      <Toaster closeButton />
    </>
  );
}