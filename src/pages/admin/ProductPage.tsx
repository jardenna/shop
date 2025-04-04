import { useGetAllProductsQuery } from '../../features/products/productApiSlice';

const ProductPage = () => {
  const { data: allProducts } = useGetAllProductsQuery();
  console.log(allProducts);

  return <section>Products</section>;
};

export default ProductPage;
