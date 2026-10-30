import LayoutElement from '../../../layout/LayoutElement';

interface ProductAsideHeaderProps {
  ariaLabel: string;
  ariaLabelledby: string;
  headerText: string;
}

const ProductAsideHeader = ({
  headerText,
  ariaLabelledby,
  ariaLabel,
}: ProductAsideHeaderProps) => (
  <LayoutElement className="product-aside-header" ariaLabel={ariaLabel}>
    <h1 id={ariaLabelledby}>{headerText}</h1>
  </LayoutElement>
);

export default ProductAsideHeader;
