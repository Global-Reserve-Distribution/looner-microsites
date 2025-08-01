import FigmaProductHero from '../../components/FigmaProductHero';
import { fetchProducts } from '../../lib/shopify/server-actions';

export default async function FigmaHeroPage() {
  // Fetch products for real data
  const allProducts = await fetchProducts({});
  
  // Find a 10mg soda product
  const product = allProducts.find((product) => {
    const tags = (product.tags || []).map((tag: string) => tag.toLowerCase());
    const title = product.title.toLowerCase();
    const description = (product.description || "").toLowerCase();

    const hasSodaTag = tags.some((tag: string) => tag.includes("soda"));
    const has10mgThc = 
      title.includes("10mg") || title.includes("10 mg") ||
      description.includes("10mg") || description.includes("10 mg") ||
      tags.some((tag: string) => tag.includes("10mg") || tag.includes("10 mg"));
    
    return hasSodaTag && has10mgThc;
  });

  return <FigmaProductHero product={product} />;
}