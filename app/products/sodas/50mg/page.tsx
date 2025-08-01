import NewProductPage from "../../../../components/NewProductPage";
import { productConfigs } from "../../../../lib/product-configs";
import { fetchProducts } from "../../../../lib/shopify/server-actions";

export default async function Sodas50mgPage() {
  const config = productConfigs['soda-50mg'];
  
  // Fetch products for this category
  const allProducts = await fetchProducts({});
  
  // Filter products for 50mg sodas
  const products = allProducts.filter((product) => {
    const tags = (product.tags || []).map((tag: string) => tag.toLowerCase());
    const title = product.title.toLowerCase();
    const description = (product.description || "").toLowerCase();

    // Exclude any products with 'bundle' tag
    const hasBundle = tags.some((tag: string) => tag.includes("bundle"));
    if (hasBundle) return false;

    const hasSodaTag = tags.some((tag: string) => tag.includes("soda"));
    const has50mgThc = 
      title.includes("50mg") || title.includes("50 mg") ||
      description.includes("50mg") || description.includes("50 mg") ||
      tags.some((tag: string) => tag.includes("50mg") || tag.includes("50 mg"));
    
    return hasSodaTag && has50mgThc;
  });

  return <NewProductPage config={config} products={products} />;
}