import { fetchProducts } from '../lib/shopify/server-actions';
import { FigmaHeaderClient } from './FigmaHeader';

// Transform Shopify products into navigation structure (same as brez-navbar.tsx)
async function getNavigationData() {
  try {
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
        return `/products/gummies?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
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
      
      // Default fallback
      return `/products/sodas/10mg?flavor=${encodeURIComponent(title.replace(/\s+/g, '-'))}`;
    };

    // Separate products by type
    const infusedProducts = products.filter((product: any) => {
      const tags = product.tags.map((tag: string) => tag.toLowerCase());
      return !tags.includes('edible') && (
        product.title.toLowerCase().includes('mg') ||
        product.description?.toLowerCase().includes('mg') ||
        tags.some((tag: string) => tag.includes('mg'))
      );
    });

    const edibleProducts = products.filter((product: any) => {
      const tags = product.tags.map((tag: string) => tag.toLowerCase());
      return tags.includes('edible');
    });

    // Map screenshot names to real Shopify products
    const mapProductToShopify = (screenshotName: string, products: any[]) => {
      const searchTerms = screenshotName.toLowerCase().split(' ');
      
      for (const product of products) {
        const title = product.title.toLowerCase();
        const description = (product.description || '').toLowerCase();
        const tags = (product.tags || []).map((tag: string) => tag.toLowerCase()).join(' ');
        
        // For Pink Lemonade, look for Sparkling Lemonades with variants
        if (screenshotName === 'Pink Lemonade') {
          // Check if this is the Sparkling Lemonades product or contains lemonade
          if (title.includes('sparkling lemonade') || title.includes('lemonade') || 
              description.includes('lemonade') || tags.includes('lemonade')) {
            
            // Check if it has Pink Lemonade variant
            if (product.variants && product.variants.length > 0) {
              const pinkVariant = product.variants.find((variant: any) => 
                variant.title && variant.title.toLowerCase().includes('pink')
              );
              
              if (pinkVariant) {
                return {
                  name: screenshotName,
                  href: getProductRoute(product) || '/products/sodas/10mg',
                  imageSrc: product.featuredImage?.url || '/logo.webp',
                  thcContent: extractTHCContent(product) || '10mg'
                };
              }
            }
            
            // Fallback: if it's any lemonade product, use it
            return {
              name: screenshotName,
              href: getProductRoute(product) || '/products/sodas/10mg',
              imageSrc: product.featuredImage?.url || '/logo.webp',
              thcContent: extractTHCContent(product) || '10mg'
            };
          }
        } else {
          // For other products, use normal matching
          if (searchTerms.some(term => title.includes(term) || description.includes(term) || tags.includes(term))) {
            return {
              name: screenshotName,
              href: getProductRoute(product) || '/products/sodas/10mg',
              imageSrc: product.featuredImage?.url || '/logo.webp',
              thcContent: extractTHCContent(product) || '10mg'
            };
          }
        }
      }
      
      // Fallback if no match found
      return {
        name: screenshotName,
        href: `/products/sodas/10mg?flavor=${encodeURIComponent(screenshotName.toLowerCase().replace(/\s+/g, '-'))}`,
        imageSrc: '/logo.webp',
        thcContent: '10mg'
      };
    };

    // Create beverage products using real Shopify data where available
    const screenshotBeverageProducts = [
      'Wild Grape', 'Professor Pepper', 'Classic Root Beer', 'Sweet Orange', 'Pink Lemonade'
    ].map(name => mapProductToShopify(name, infusedProducts.length > 0 ? products : []));

    // Create edible products using real Shopify data where available  
    const screenshotEdibleProducts = [
      'Twilight Night', 'Zenith Day', 'Lunar Night', 'Nooner Day'
    ].map(name => mapProductToShopify(name, edibleProducts.length > 0 ? products : []));

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
    };
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    
    // Fallback navigation with screenshot product names
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
                { name: 'Wild Grape', href: '/products/sodas/10mg', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Professor Pepper', href: '/products/sodas/10mg', imageSrc: '/logo.webp', thcContent: '10mg' },
                { name: 'Pink Lemonade', href: '/products/sodas/10mg', imageSrc: '/logo.webp', thcContent: '10mg' }
              ]
            },
            {
              id: 'edibles',
              name: 'EDIBLES',
              items: [
                { name: 'Twilight Night', href: '/products/gummies', imageSrc: '/logo.webp', thcContent: '5mg' },
                { name: 'Nooner Day', href: '/products/gummies', imageSrc: '/logo.webp', thcContent: '5mg' }
              ]
            }
          ]
        }
      ]
    };
  }
}

export default async function FigmaHeaderWrapper() {
  const navigation = await getNavigationData();
  
  return <FigmaHeaderClient navigation={navigation} />;
}