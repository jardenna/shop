import type { ReactElement } from 'react';
import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { getProductLink } from '../cartUtils';
import ProductCart from './ProductCart';

interface ProductCartListProps {
  products: BaseProduct[];
  productView?: string;
  children?: (product: BaseProduct) => ReactElement;
}
const ProductCartList = ({
  products,
  productView = '',
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
