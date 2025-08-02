import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

export type ProductLabelVariant = 'mini' | 'small' | 'medium';

type ProductListItemProps = {
  ariaLabel: string;
  style?: CSSProperties;
  text?: string;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  text,
  variant = 'medium',
  style,
  ariaLabel,
}: ProductListItemProps) => (
  <li className="stacked-border-item" style={style}>
    <span className={`product-content ${variant}`}>{text}</span>
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </li>
);

export default ProductListItem;
