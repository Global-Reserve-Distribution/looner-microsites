import { fetchProducts } from 'lib/shopify/server-actions';
import BrezNavbarClient from './brez-navbar-client';

// Transform Shopify products into BREZ-style navigation structure
async function getNavigationData() {
  try {
    // Fetch real Shopify products
    const products = await fetchProducts({});
    
    // Extract THC content from product descriptions or titles
    const extractTHCContent = (product: any) => {
      const text = `${product.title} ${product.description}`.toLowerCase();
      const thcMatch = text.match(/(\d+)\s*mg/i);
      return thcMatch ? `${thcMatch[1]}mg` : '';
    };

    // Filter products for INFUSED (THC products)
    const infusedProducts = products
      .filter(product => 
        product.tags.some((tag: string) => tag.toLowerCase().includes('soda')) &&
        !product.tags.some((tag: string) => tag.toLowerCase().includes('bundle')) &&
        extractTHCContent(product)
      )
      .slice(0, 6)
      .map(product => ({
        name: product.title.replace(/\s*-.*$/, ''), // Clean up title
        href: `/product/${product.handle}`,
        imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
        thcContent: extractTHCContent(product)
      }));

    // Filter products for THC-FREE (non-THC products)
    const thcFreeProducts = products
      .filter(product => 
        product.tags.some((tag: string) => tag.toLowerCase().includes('soda')) &&
        !product.tags.some((tag: string) => tag.toLowerCase().includes('bundle')) &&
        !extractTHCContent(product)
      )
      .slice(0, 3)
      .map(product => ({
        name: product.title.replace(/\s*-.*$/, ''),
        href: `/product/${product.handle}`,
        imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
        thcContent: ''
      }));

    // Fallback to mock data if no products found
    const mockProducts = infusedProducts.length === 0 ? [
      { name: 'Professor Pepper', href: '/product/professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Lemon Lime', href: '/product/lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Cola', href: '/product/cola', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    ] : infusedProducts;

    const mockThcFree = thcFreeProducts.length === 0 ? [
      { name: 'Flow', href: '/product/flow', imageSrc: '/placeholder-product.jpg', thcContent: '' },
    ] : thcFreeProducts;

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
              items: mockThcFree,
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
  } catch (error) {
    console.error('Error fetching navigation products:', error);
    // Fallback to static data on error
    return {
      categories: [
        {
          id: 'shop',
          name: 'Shop',
          sections: [
            {
              id: 'infused',
              name: 'INFUSED',
              items: [
                { name: 'Professor Pepper', href: '/product/professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
                { name: 'Lemon Lime', href: '/product/lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
              ],
            },
            {
              id: 'thc-free', 
              name: 'THC-FREE',
              items: [
                { name: 'Flow', href: '/product/flow', imageSrc: '/placeholder-product.jpg', thcContent: '' },
              ],
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
}

export default async function BrezNavbar() {
  const navigation = await getNavigationData();
  
  return <BrezNavbarClient navigation={navigation} />;
}