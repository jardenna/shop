import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

export type ProductLabelVariant = 'mini' | 'small' | 'medium';

type ProductListItemProps = {
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  text?: string;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  text,
  variant = 'medium',
  style,
  ariaLabel,
  className = 'size-list-item',
}: ProductListItemProps) => (
  <li className={`product-list-item ${className}`} style={style}>
    <span className={`product-label ${variant}`}>{text}</span>
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </li>
);

export default ProductListItem;
