import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Skeleton from '../../../components/skeleton/Skeleton';
import LayoutElement from '../../../layout/LayoutElement';
import './CollectionAside.styles.scss';
import CollectionNav from './CollectionNav';
import CollectionPageHeader from './CollectionPageHeader';

type CollectionAsideProps = {
  asideHeading: string;
  category: string;
  isLoading: boolean;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[] | null;
  onReset: () => void;
};

const CollectionAside = ({
  asideHeading,
  subMenu,
  category,
  isLoading,
  onReset,
  language,
}: CollectionAsideProps) => (
  <aside className="collection-aside">
    <CollectionPageHeader ariaLabel={language.page} headerText={asideHeading} />
    {isLoading && (
      <div className="flex column">
        <Skeleton count={4} />
      </div>
    )}
    {subMenu && (
      <LayoutElement as="nav" ariaLabel={language.page}>
        <CollectionNav
          subMenu={subMenu}
          category={category}
          onReset={() => {
            onReset();
          }}
        />
      </LayoutElement>
    )}
  </aside>
);

export default CollectionAside;
