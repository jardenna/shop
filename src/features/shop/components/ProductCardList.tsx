import type { ReactElement } from 'react';
import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { getProductLink } from '../cartUtils';
import ProductCard from './ProductCard';

interface ProductCardListProps {
  products: BaseProduct[];
  productView?: string;
  children?: (product: BaseProduct) => ReactElement;
}

const ProductCardList = ({
  products,
  productView = '',
  children,
}: ProductCardListProps) => (
  <ul className={`product-cart-list ${productView}`}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard
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

export default ProductCardList;
