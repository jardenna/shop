import { CSSProperties, ElementType, ReactNode } from 'react';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';

export type ProductLabelVariant = 'mini' | 'small' | 'medium' | 'large';

type ProductListItemProps = {
  children: ReactNode;
  ariaLabel?: string;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  iconName?: IconName;
  isUnavailable?: boolean;
  style?: CSSProperties;
  text?: string;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  children,
  as: Tag = 'label',
  htmlFor,
  text,
  iconName,
  ariaLabel,
  variant = 'medium',
  style,
  isUnavailable,
  className = 'size-list-item',
}: ProductListItemProps) => (
  <li className={`product-list-item ${className}`} style={style}>
    <Tag
      htmlFor={htmlFor}
      className={`product-label ${variant} ${isUnavailable ? 'text-line-through' : ''}`}
    >
      {iconName ? (
        <IconContent
          iconName={iconName}
          fill={htmlFor}
          size="70"
          title=""
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
