import type { ReactNode } from 'react';
import './_product-list.scss';

type ProductListVariant = 'size' | 'color';

interface ProductListProps {
  children: ReactNode;
  title: string;
  variant: ProductListVariant;
}

const ProductList = ({ children, title, variant }: ProductListProps) => (
  <div className="product-list-container">
    <span>{title}</span>
    <ul className={`product-list ${variant}-list`}>{children}</ul>
  </div>
);

export default ProductList;
