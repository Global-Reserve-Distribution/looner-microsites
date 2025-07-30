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

    // Use exact products from screenshot with proper images
    const screenshotBeverageProducts = [
      { name: 'Wild Grape', href: '/products/sodas/10mg?flavor=wild-grape', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Professor Pepper', href: '/products/sodas/10mg?flavor=professor-pepper', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Classic Root Beer', href: '/products/sodas/10mg?flavor=classic-root-beer', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Sweet Orange', href: '/products/sodas/10mg?flavor=sweet-orange', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Pink Lemonade', href: '/products/sodas/10mg?flavor=pink-lemonade', imageSrc: '/logo.webp', thcContent: '10mg' },
    ];

    const screenshotEdibleProducts = [
      { name: 'Twilight Night', href: '/products/edibles?flavor=twilight-night', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Zenith Day', href: '/products/edibles?flavor=zenith-day', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Lunar Night', href: '/products/edibles?flavor=lunar-night', imageSrc: '/logo.webp', thcContent: '10mg' },
      { name: 'Nooner Day', href: '/products/edibles?flavor=nooner-day', imageSrc: '/logo.webp', thcContent: '10mg' },
    ];

    return {
      categories: [
        {
          id: 'shop',
          name: 'Shop',
          sections: [
            {
              id: 'beverage',
              name: 'BEVERAGE',
              items: screenshotBeverageProducts,
            },
            {
              id: 'edibles', 
              name: 'EDIBLES',
              items: screenshotEdibleProducts,
            },
          ],
        },
      ],
      pages: [
        { name: 'Shop All', href: '/shop' },
        { name: 'Testing and COAs', href: '/testing' },
        { name: 'Contact Us', href: '/contact' },
      ],
    };
  } catch (error) {
    console.error('Error fetching navigation products:', error);
    // Fallback to screenshot data on error
    return {
      categories: [
        {
          id: 'shop',
          name: 'Shop',
          sections: [
            {
              id: 'beverage',
              name: 'BEVERAGE',
              items: [
                { name: 'Wild Grape', href: '/products/sodas/10mg?flavor=wild-grape', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Professor Pepper', href: '/products/sodas/10mg?flavor=professor-pepper', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Classic Root Beer', href: '/products/sodas/10mg?flavor=classic-root-beer', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Sweet Orange', href: '/products/sodas/10mg?flavor=sweet-orange', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Pink Lemonade', href: '/products/sodas/10mg?flavor=pink-lemonade', imageSrc: '/logo.webp', thcContent: '10mg' },
              ],
            },
            {
              id: 'edibles', 
              name: 'EDIBLES',
              items: [
                { name: 'Twilight Night', href: '/products/edibles?flavor=twilight-night', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Zenith Day', href: '/products/edibles?flavor=zenith-day', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Lunar Night', href: '/products/edibles?flavor=lunar-night', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Nooner Day', href: '/products/edibles?flavor=nooner-day', imageSrc: '/logo.webp', thcContent: '10mg' },
              ],
            },
          ],
        },
      ],
      pages: [
        { name: 'Shop All', href: '/shop' },
        { name: 'Testing and COAs', href: '/testing' },
        { name: 'Contact Us', href: '/contact' },
      ],
    };
  }
}

export default async function BrezNavbar() {
  const navigation = await getNavigationData();
  
  return <BrezNavbarClient navigation={navigation} />;
}