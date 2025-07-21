import { CSSProperties, ElementType, ReactNode } from 'react';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';

type ProductListItemProps = {
  children: ReactNode;
  ariaLabel?: string;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  iconName?: IconName;
  style?: CSSProperties;
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
  style,
}: ProductListItemProps) => (
  <li className={`product-list-item ${className}`} style={style}>
    <Tag className="product-label" htmlFor={htmlFor}>
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
