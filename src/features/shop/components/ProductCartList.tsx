import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  productView?: string;
  children?: (product: BaseProduct) => React.ReactNode;
  getProductLink: (id: string) => string;
}
const ProductCartList = ({
  products,
  productView,
  getProductLink,
  children,
}: ProductCartListProps) => (
  <ul className={`product-cart-list ${productView}`}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCart
          productView={productView}
          linkTo={getProductLink(product.id)}
          product={product}
          isOutOfStock={product.countInStock === 0}
        />

        {children?.(product)}
      </li>
    ))}
  </ul>
);

export default ProductCartList;
