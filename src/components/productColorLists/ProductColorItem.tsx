import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

type ProductColorItemProps = {
  ariaLabel: string;
  style: CSSProperties;
};

const ProductColorItem = ({ ariaLabel, style }: ProductColorItemProps) => (
  <li style={style} className="option-box">
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </li>
);

export default ProductColorItem;
