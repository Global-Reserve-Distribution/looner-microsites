import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description:
    'Premium THC beverages and cannabis-infused drinks. Discover LOONER\'s collection of craft cannabis beverages with fast shipping.',
  openGraph: {
    type: 'website',
    title: 'LOONER THC Beverages - Premium Cannabis Drinks',
    description: 'Premium THC beverages and cannabis-infused drinks. Discover LOONER\'s collection of craft cannabis beverages.'
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
