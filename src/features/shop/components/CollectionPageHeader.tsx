import LayoutElement from '../../../layout/LayoutElement';

type CollectionPageHeaderProps = {
  ariaLabel: string;
  headerText: string;
};
const CollectionPageHeader = ({
  ariaLabel,
  headerText,
}: CollectionPageHeaderProps) => (
  <LayoutElement ariaLabel={ariaLabel} className="collection-page-header">
    <h1>{headerText}</h1>
  </LayoutElement>
);

export default CollectionPageHeader;
