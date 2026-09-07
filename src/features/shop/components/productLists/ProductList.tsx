import type { ReactNode } from 'react';
import './_product-list.scss';

interface ProductListProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const ProductList = ({ children, className, title }: ProductListProps) => (
  <div className="product-list-container">
    <span>{title}</span>
    <ul className={`product-list ${className}`}>{children}</ul>
  </div>
);

export default ProductList;
