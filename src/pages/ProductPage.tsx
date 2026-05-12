import { Navigate, useParams } from "react-router-dom";

// Legacy mock product route — redirect everything to the live Shopify shop.
const ProductPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  if (productSlug) return <Navigate to={`/shop/product/${productSlug}`} replace />;
  return <Navigate to="/shop" replace />;
};

export default ProductPage;
