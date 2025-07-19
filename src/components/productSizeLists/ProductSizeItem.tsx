import { ElementType, ReactNode } from 'react';

type ProductSizeItemProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  text?: string;
};

const ProductSizeItem = ({
  children,
  className = '',
  as: Tag = 'label',
  htmlFor,
  text,
}: ProductSizeItemProps) => (
  <li className={`product-size-item ${className}`}>
    <Tag className="product-size" htmlFor={htmlFor || undefined}>
      {text}
    </Tag>
    {children}
  </li>
);

export default ProductSizeItem;
