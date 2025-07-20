import { ElementType, ReactNode } from 'react';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';

type ProductListItemProps = {
  children: ReactNode;
  ariaLabel?: string;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  iconName?: IconName;
  text?: string;
};

const ProductListItem = ({
  children,
  className = '',
  as: Tag = 'label',
  htmlFor,
  text,
  iconName,
  ariaLabel,
}: ProductListItemProps) => (
  <li className={`product-list-item ${className}`}>
    <Tag className="product-label" htmlFor={htmlFor || undefined}>
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

export default ProductListItem;
