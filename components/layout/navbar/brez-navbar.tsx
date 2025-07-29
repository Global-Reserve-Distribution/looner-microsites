import { fetchProducts } from 'lib/shopify/server-actions';
import BrezNavbarClient from './brez-navbar-client';

// Transform Shopify products into BREZ-style navigation structure
async function getNavigationData() {
  // Return static navigation structure to avoid server errors during development
  const mockProducts = [
    { name: 'Professor Pepper', href: '/product/professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    { name: 'Lemon Lime', href: '/product/lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    { name: 'Cola', href: '/product/cola', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    { name: 'Sweet Orange', href: '/product/sweet-orange', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    { name: 'Wild Grape', href: '/product/wild-grape', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    { name: 'Mocktail Mule', href: '/product/mocktail-mule', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
  ];

  const thcFreeProducts = [
    { name: 'Flow', href: '/product/flow', imageSrc: '/placeholder-product.jpg', thcContent: '' },
    { name: 'Elevate', href: '/product/elevate', imageSrc: '/placeholder-product.jpg', thcContent: '' },
    { name: 'Dream', href: '/product/dream', imageSrc: '/placeholder-product.jpg', thcContent: '' },
  ];

  return {
    categories: [
      {
        id: 'shop',
        name: 'Shop',
        sections: [
          {
            id: 'infused',
            name: 'INFUSED',
            items: mockProducts,
          },
          {
            id: 'thc-free', 
            name: 'THC-FREE',
            items: thcFreeProducts,
          },
        ],
        shopAll: { name: 'SHOP ALL', href: '/shop' },
        bundleAndSave: { name: 'BUNDLE & SAVE', href: '/bundles' },
        giftCard: { name: 'GIFT CARD', href: '/gift-cards' },
      },
    ],
    pages: [
      { name: 'Bundle & Save', href: '/bundles' },
      { name: 'Store Locator', href: '/store-locator' },
    ],
  };
}

export default async function BrezNavbar() {
  const navigation = await getNavigationData();
  
  return <BrezNavbarClient navigation={navigation} />;
}