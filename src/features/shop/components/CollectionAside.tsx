import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import LayoutElement from '../../../layout/LayoutElement';
import './collectionAside.styles.scss';
import CollectionNav from './CollectionNav';
import CollectionPageHeader from './CollectionPageHeader';

type CollectionAsideProps = {
  ariaLabelledby: string;
  category: string;
  headerText: string;
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
  ariaLabelledby,
  headerText,
  getProductLink,
}: CollectionAsideProps) => (
  <div>
    <CollectionPageHeader
      headerText={headerText}
      ariaLabelledby={ariaLabelledby}
    />
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
  </div>
);
export default CollectionAside;
