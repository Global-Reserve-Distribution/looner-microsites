import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { ConditionalNavigation } from '../components/conditional-navigation';
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
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-black selection:bg-cannabis-300 antialiased">
        <ConditionalNavigation>
          {children}
        </ConditionalNavigation>
        <Toaster closeButton />
      </body>
    </html>
  );
}