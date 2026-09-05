import LayoutElement from '../../../layout/LayoutElement';
import CollectionNav, { CollectionNavProps } from './CollectionNav';
import ProductAsideHeader from './ProductAsideHeader';
import './productAside.styles.scss';

interface ProductAsideProps extends CollectionNavProps {
  ariaLabelledby: string;
  headerText: string;
  language: Record<string, string>;
}

const ProductAside = ({
  subMenu,
  category,
  onReset,
  language,
  linkTo,
  ariaLabelledby,
  headerText,
  getProductLink,
}: ProductAsideProps) => (
  <div>
    <ProductAsideHeader
      headerText={headerText}
      ariaLabelledby={ariaLabelledby}
    />
    <section className="product-aside">
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
export default ProductAside;
