import ProductPage from "../../../components/ProductPage";
import { productConfigs } from "../../../lib/product-configs";

export default function EdiblesPage() {
  return <ProductPage config={productConfigs['edibles']} />;
}