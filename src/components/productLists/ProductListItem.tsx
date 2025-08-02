import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

export type ProductLabelVariant = 'mini' | 'small' | 'medium';

type ProductListItemProps = {
  ariaLabel: string;
  style?: CSSProperties;
  text?: string;
  unavailable?: boolean;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  text,
  variant = 'medium',
  style,
  ariaLabel,
  unavailable,
}: ProductListItemProps) => (
  <li className="product-list-item" style={style}>
    <span
      className={`product-list-content ${variant} ${unavailable ? 'unavailable' : ''}`}
    >
      {text}
    </span>
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </li>
);

export default ProductListItem;
