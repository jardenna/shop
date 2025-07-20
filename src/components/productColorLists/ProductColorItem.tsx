import { CSSProperties } from 'react';
import VisuallyHidden from '../VisuallyHidden';

type ProductColorItemProps = {
  colour: string;
  style: CSSProperties;
};

const ProductColorItem = ({ colour, style }: ProductColorItemProps) => (
  <li style={style} className="option-box">
    <VisuallyHidden>{colour}</VisuallyHidden>
  </li>
);

export default ProductColorItem;
