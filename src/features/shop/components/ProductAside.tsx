import LayoutElement from '../../../layout/LayoutElement';
import ProductAsideHeader from './ProductAsideHeader';
import ProductAsideNav, { ProductAsideNavProps } from './ProductAsideNav';
import './productAside.styles.scss';

interface ProductAsideProps extends ProductAsideNavProps {
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
        <ProductAsideNav
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
