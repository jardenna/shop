import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Skeleton from '../../../components/skeleton/Skeleton';
import LayoutElement from '../../../layout/LayoutElement';
import './CollectionAside.styles.scss';
import CollectionNav from './CollectionNav';

type CollectionAsideProps = {
  category: string;
  isLoading: boolean;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[] | null;
  onReset: () => void;
};

const CollectionAside = ({
  subMenu,
  category,
  isLoading,
  onReset,
  language,
}: CollectionAsideProps) => (
  <section className="collection-aside">
    {isLoading && (
      <div className="flex column">
        <Skeleton count={4} />
      </div>
    )}
    {subMenu && (
      <LayoutElement as="nav" ariaLabel={language.categoryNavigation}>
        <CollectionNav
          subMenu={subMenu}
          category={category}
          onReset={() => {
            onReset();
          }}
        />
      </LayoutElement>
    )}
  </section>
);

export default CollectionAside;
