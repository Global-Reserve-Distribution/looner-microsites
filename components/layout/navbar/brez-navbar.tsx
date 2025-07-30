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

    // Generate product route based on product characteristics
    const getProductRoute = (product: any) => {
      const tags = product.tags.map((tag: string) => tag.toLowerCase());
      const title = product.title.toLowerCase();
      const description = (product.description || '').toLowerCase();
      
      // Check if it's an edible
      if (tags.some((tag: string) => tag === 'edible')) {
        return `/products/edibles?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
      }
      
      // Check if it has 50mg THC content (higher priority than 10mg)
      if (title.includes('50mg') || title.includes('50 mg') || 
          description.includes('50mg') || description.includes('50 mg') ||
          tags.some((tag: string) => tag.includes('50mg') || tag.includes('50 mg'))) {
        return `/products/sodas/50mg?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
      }
      
      // Check if it has 10mg THC content
      if (title.includes('10mg') || title.includes('10 mg') || 
          description.includes('10mg') || description.includes('10 mg') ||
          tags.some((tag: string) => tag.includes('10mg') || tag.includes('10 mg'))) {
        return `/products/sodas/10mg?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
      }
      
      // Default to 10mg sodas page for THC beverages (assuming 10mg is default)
      if (tags.some((tag: string) => tag.includes('soda')) && 
          !tags.some((tag: string) => tag.includes('bundle'))) {
        return `/products/sodas/10mg?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
      }
      
      // Fallback to 10mg sodas page
      return `/products/sodas/10mg?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
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
          href: getProductRoute(product),
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
          name: displayName && displayName.trim() !== "" ? displayName : product.title.replace(/\s+/g, '-'),
          href: getProductRoute(product),
          imageSrc: product.featuredImage?.url || '/placeholder-product.jpg',
          thcContent: extractTHCContent(product)
        };
      });

    // Debug: Check what edible products were found
    console.log('Found edible products:', edibleProducts.length);
    console.log('All product tags sample:', products.slice(0, 3).map(p => ({ title: p.title, tags: p.tags })));

    // Fallback to mock data if no products found
    const mockProducts = infusedProducts.length === 0 ? [
      { name: 'Professor Pepper', href: '/products/sodas/10mg?flavor=professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Lemon Lime', href: '/products/sodas/10mg?flavor=lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Cola High Dose', href: '/products/sodas/50mg?flavor=cola-high-dose', imageSrc: '/placeholder-product.jpg', thcContent: '50mg' },
    ] : infusedProducts;

    const mockEdibles = edibleProducts.length === 0 ? [
      { name: 'Honey Gummies', href: '/products/edibles?flavor=honey-gummies', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
      { name: 'Chocolate Squares', href: '/products/edibles?flavor=chocolate-squares', imageSrc: '/placeholder-product.jpg', thcContent: '5mg' },
      { name: 'Berry Gummies', href: '/products/edibles?flavor=berry-gummies', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
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
                { name: 'Professor Pepper', href: '/products/sodas/10mg?flavor=professor-pepper', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
                { name: 'Lemon Lime', href: '/products/sodas/10mg?flavor=lemon-lime', imageSrc: '/placeholder-product.jpg', thcContent: '10mg' },
              ],
            },
            {
              id: 'edibles', 
              name: 'EDIBLES',
              items: [
                { name: 'Honey Gummies', href: '/products/edibles?flavor=honey-gummies', imageSrc: '🍯', thcContent: '10mg' },
                { name: 'Chocolate Squares', href: '/products/edibles?flavor=chocolate-squares', imageSrc: '🍫', thcContent: '5mg' },
              ],
            },
          ],
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