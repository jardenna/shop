import { CSSProperties } from 'react';
import VisuallyHidden from '../../../../components/VisuallyHidden';
import { SizeVariantNew } from '../../../../types/types';

type ProductListItemProps = {
  screenReaderText?: string;
  style?: CSSProperties;
  text?: string;
  unavailable?: boolean;
  variant?: SizeVariantNew;
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
