import NewProductPage from "../../../../components/NewProductPage";
import { productConfigs } from "../../../../lib/product-configs";
import { fetchProducts } from "../../../../lib/shopify/server-actions";

export default async function Sodas10mgPage() {
  const config = productConfigs['soda-10mg'];
  
  // Fetch products for this category
  const allProducts = await fetchProducts({});
  
  // Filter products for 10mg sodas
  const products = allProducts.filter((product) => {
    const tags = (product.tags || []).map((tag: string) => tag.toLowerCase());
    const title = product.title.toLowerCase();
    const description = (product.description || "").toLowerCase();

    // Exclude any products with 'bundle' tag
    const hasBundle = tags.some((tag: string) => tag.includes("bundle"));
    if (hasBundle) return false;

    const hasSodaTag = tags.some((tag: string) => tag.includes("soda"));
    const has10mgThc = 
      title.includes("10mg") || title.includes("10 mg") ||
      description.includes("10mg") || description.includes("10 mg") ||
      tags.some((tag: string) => tag.includes("10mg") || tag.includes("10 mg"));
    
    return hasSodaTag && has10mgThc;
  });

  return <NewProductPage config={config} products={products} />;
}