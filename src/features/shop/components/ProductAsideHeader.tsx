import LayoutElement from '../../../layout/LayoutElement';

interface ProductAsideHeaderProps {
  ariaLabelledby: string;
  headerText: string;
}
const ProductAsideHeader = ({
  headerText,
  ariaLabelledby,
}: ProductAsideHeaderProps) => (
  <LayoutElement className="collection-page-header">
    <h1 id={ariaLabelledby}>{headerText}</h1>
  </LayoutElement>
);

export default ProductAsideHeader;
