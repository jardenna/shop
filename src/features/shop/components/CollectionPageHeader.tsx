import LayoutElement from '../../../layout/LayoutElement';

type CollectionPageHeaderProps = {
  ariaLabelledby: string;
  headerText: string;
};
const CollectionPageHeader = ({
  headerText,
  ariaLabelledby,
}: CollectionPageHeaderProps) => (
  <LayoutElement className="collection-page-header">
    <h1 id={ariaLabelledby}>{headerText}</h1>
  </LayoutElement>
);

export default CollectionPageHeader;
