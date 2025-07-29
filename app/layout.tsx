import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { CartProvider } from '../components/cart/cart-context';
import { fetchCart } from '../lib/shopify/server-actions';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  title: {
    default: 'LOONER THC Beverages - Premium Cannabis Drinks',
    template: `%s | LOONER`
  },
  description: 'Premium cannabis-infused beverages crafted for the perfect experience.',
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cartPromise = fetchCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-black selection:bg-cannabis-300 antialiased">
        <CartProvider cartPromise={cartPromise}>
          {children}
        </CartProvider>
        <Toaster closeButton />
      </body>
    </html>
  );
}