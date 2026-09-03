import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import LayoutElement from '../../../layout/LayoutElement';
import './collectionAside.styles.scss';
import CollectionNav from './CollectionNav';

type CollectionAsideProps = {
  category: string;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[];
  linkTo?: string;
  getProductLink: (id: string) => string;
  onReset: () => void;
};

const CollectionAside = ({
  subMenu,
  category,
  onReset,
  language,
  linkTo,
  getProductLink,
}: CollectionAsideProps) => (
  <section className="collection-aside">
    <LayoutElement as="nav" ariaLabel={language.categoryNavigation}>
      <CollectionNav
        subMenu={subMenu}
        category={category}
        onReset={onReset}
        getProductLink={getProductLink}
        linkTo={linkTo}
      />
    </LayoutElement>
  </section>
);
export default CollectionAside;
