import { ElementType, ReactNode } from 'react';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';

type ProductSizeItemProps = {
  children: ReactNode;
  ariaLabel?: string;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  iconName?: IconName;
  text?: string;
};

const ProductSizeItem = ({
  children,
  className = '',
  as: Tag = 'label',
  htmlFor,
  text,
  iconName,
  ariaLabel,
}: ProductSizeItemProps) => (
  <li className={`product-size-item ${className}`}>
    <Tag className="product-size" htmlFor={htmlFor || undefined}>
      {iconName ? (
        <IconContent
          iconName={iconName}
          fill={htmlFor}
          size="70"
          title={iconName}
          ariaLabel={ariaLabel || ''}
        />
      ) : (
        text
      )}
    </Tag>
    {children}
  </li>
);

export default ProductSizeItem;
