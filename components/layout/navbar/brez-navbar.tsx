import { fetchProducts } from 'lib/shopify/server-actions';
import BrezNavbarClient from './brez-navbar-client';

// Transform Shopify products into BREZ-style navigation structure
async function getNavigationData() {
  try {
    const products = await fetchProducts({});
    
    // Group products by tags for INFUSED vs THC-FREE categories
    const infusedProducts = products.filter(product => 
      product.tags.some((tag: string) => tag.toLowerCase().includes('cannabis') || tag.toLowerCase().includes('thc'))
    );
    
    const thcFreeProducts = products.filter(product => 
      !product.tags.some((tag: string) => tag.toLowerCase().includes('cannabis') || tag.toLowerCase().includes('thc'))
    );

    // Transform products into navigation items
    const transformProducts = (products: any[]) => 
      products.slice(0, 6).map(product => ({
        name: product.title.replace(' - 10mg', '').replace(' - 5mg', ''),
        href: `/product/${product.handle}`,
        imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
        thcContent: product.tags.find((tag: string) => tag.includes('mg'))?.replace('mg THC', 'mg') || '',
      }));

    return {
      categories: [
        {
          id: 'shop',
          name: 'Shop',
          sections: [
            {
              id: 'infused',
              name: 'INFUSED',
              items: transformProducts(infusedProducts),
            },
            {
              id: 'thc-free', 
              name: 'THC-FREE',
              items: transformProducts(thcFreeProducts),
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
    console.error('Error fetching navigation data:', error);
    // Return empty structure on error
    return {
      categories: [{
        id: 'shop',
        name: 'Shop', 
        sections: [
          { id: 'infused', name: 'INFUSED', items: [] },
          { id: 'thc-free', name: 'THC-FREE', items: [] },
        ],
        shopAll: { name: 'SHOP ALL', href: '/shop' },
        bundleAndSave: { name: 'BUNDLE & SAVE', href: '/bundles' },
        giftCard: { name: 'GIFT CARD', href: '/gift-cards' },
      }],
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