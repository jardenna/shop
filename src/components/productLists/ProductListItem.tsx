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
  style?: CSSProperties;
  text?: string;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  children,
  className = '',
  as: Tag = 'label',
  htmlFor,
  text,
  iconName,
  ariaLabel,
  variant = 'medium',
  style,
}: ProductListItemProps) => (
  <li className="product-list-item" style={style}>
    <Tag htmlFor={htmlFor} className={`product-label ${className} ${variant}`}>
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
