import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import LayoutElement from '../../../layout/LayoutElement';
import './collectionAside.styles.scss';
import CollectionNav from './CollectionNav';

type CollectionAsideProps = {
  category: string;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[] | null;
  onReset: () => void;
};

const CollectionAside = ({
  subMenu,
  category,
  onReset,
  language,
}: CollectionAsideProps) => (
  <section className="collection-aside">
    {subMenu && (
      <LayoutElement as="nav" ariaLabel={language.categoryNavigation}>
        <CollectionNav
          subMenu={subMenu}
          category={category}
          onReset={onReset}
        />
      </LayoutElement>
    )}
  </section>
);
export default CollectionAside;
