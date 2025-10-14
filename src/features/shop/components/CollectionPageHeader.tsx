import LayoutElement from '../../../layout/LayoutElement';

type CollectionPageHeaderProps = {
  headerText: string;
};
const CollectionPageHeader = ({ headerText }: CollectionPageHeaderProps) => (
  <LayoutElement
    className="collection-page-header"
    ariaLabelledby="collection-header"
  >
    <h1 id="collection-header">{headerText}</h1>
  </LayoutElement>
);

export default CollectionPageHeader;
