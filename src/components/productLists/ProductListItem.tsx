import { CSSProperties, ElementType, ReactNode } from 'react';
import { IconName } from '../../types/enums';
import IconContent from '../IconContent';

export type ProductLabelVariant = 'mini' | 'small' | 'medium' | 'large';

export type IconType = {
  ariaLabel: string;
  iconName: IconName;
  title: string;
};

type ProductListItemProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  htmlFor?: string;
  icon?: IconType;
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
  icon,
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
      {icon ? (
        <IconContent
          iconName={icon.iconName}
          fill={htmlFor}
          size="70"
          title=""
          ariaLabel={icon.ariaLabel}
        />
      ) : (
        text
      )}
    </Tag>
    {children}
  </li>
);

export default ProductListItem;
