import { fetchProducts } from 'lib/shopify/server-actions';
import BrezNavbarClient from './brez-navbar-client';

// Transform Shopify products into BREZ-style navigation structure
async function getNavigationData() {
  try {
    // Fetch real Shopify products
    const products = await fetchProducts({});
    
    // Extract metafields from Shopify product
    const extractMetafields = (product: any) => {
      const metafields = product.metafields || [];

      const displayNameField = metafields.find(
        (field: any) =>
          field && field.key === "display_name" && field.namespace === "custom",
      );

      return {
        displayName: displayNameField?.value || null,
      };
    };
    
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
      .map(product => {
        const { displayName } = extractMetafields(product);
        return {
          name: displayName && displayName.trim() !== "" ? displayName : product.title.replace(/\s*-.*$/, ''),
          href: `/product/${product.handle}`,
          imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
          thcContent: extractTHCContent(product)
        };
      });

    // Filter products for EDIBLES (products with 'edible' tag)
    const edibleProducts = products
      .filter(product => 
        product.tags.some((tag: string) => tag.toLowerCase() === 'edible') &&
        !product.tags.some((tag: string) => tag.toLowerCase().includes('bundle'))
      )
      .slice(0, 4)
      .map(product => {
        const { displayName } = extractMetafields(product);
        return {
          name: displayName && displayName.trim() !== "" ? displayName : product.title.replace(/\s*-.*$/, ''),
          href: `/product/${product.handle}`,
          imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
          thcContent: extractTHCContent(product)
        };
      });

    // Debug: Check what edible products were found
    console.log('Found edible products:', edibleProducts.length);
    console.log('All product tags sample:', products.slice(0, 3).map(p => ({ title: p.title, tags: p.tags })));

    // Fallback to mock data if no products found
    const mockProducts = infusedProducts.length === 0 ? [
      { name: 'Professor Pepper', href: '/product/professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Lemon Lime', href: '/product/lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Cola', href: '/product/cola', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
    ] : infusedProducts;

    const mockEdibles = edibleProducts.length === 0 ? [
      { name: 'Twilight Night', href: '/product/twilight-night', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Zenith Day', href: '/product/zenith-day', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Lunar Night', href: '/product/lunar-night', imageSrc: '/placeholder-product.jpg', thcContent: '5mg' },
      { name: 'Nooner Day', href: '/product/nooner-day', imageSrc: '/placeholder-product.jpg', thcContent: '2.5mg' },
    ] : edibleProducts;

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
              id: 'edibles', 
              name: 'EDIBLES',
              items: mockEdibles,
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
              id: 'edibles', 
              name: 'EDIBLES',
              items: [
                { name: 'Twilight Night', href: '/product/twilight-night', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
                { name: 'Zenith Day', href: '/product/zenith-day', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
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