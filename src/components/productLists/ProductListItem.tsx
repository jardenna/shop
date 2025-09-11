import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

export type ProductLabelVariant = 'mini' | 'small' | 'medium' | 'large';

type ProductListItemProps = {
  screenReaderText?: string;
  style?: CSSProperties;
  text?: string;
  unavailable?: boolean;
  variant?: ProductLabelVariant;
};

const ProductListItem = ({
  text,
  variant = 'medium',
  style,
  unavailable,
  screenReaderText,
}: ProductListItemProps) => (
  <li className="product-list-item" style={style}>
    <span
      className={`product-list-content ${variant}-item ${unavailable ? 'disabled-item' : ''}`}
    >
      {text}
      {screenReaderText && <VisuallyHidden>{screenReaderText}</VisuallyHidden>}
    </span>
  </li>
);

export default ProductListItem;
