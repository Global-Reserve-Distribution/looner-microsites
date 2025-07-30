import ProductPage from "../../../components/ProductPage";
import { productConfigs } from "../../../lib/product-configs";

export default function GummiesPage() {
  return <ProductPage config={productConfigs['gummies']} />;
}