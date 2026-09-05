import LayoutElement from '../../../layout/LayoutElement';
import './collectionAside.styles.scss';
import CollectionNav, { CollectionNavProps } from './CollectionNav';
import CollectionPageHeader from './CollectionPageHeader';

interface CollectionAsideProps extends CollectionNavProps {
  ariaLabelledby: string;
  headerText: string;
  language: Record<string, string>;
}

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
