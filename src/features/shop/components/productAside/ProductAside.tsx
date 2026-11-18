import LayoutElement from '../../../../layout/LayoutElement';
import { Language } from '../../../../types/types';
import ProductAsideHeader from './ProductAsideHeader';
import ProductAsideNav, { ProductAsideNavProps } from './ProductAsideNav';
import './_product-aside.scss';

interface ProductAsideProps extends ProductAsideNavProps {
  ariaLabelledby: string;
  headerText: string;
  language: Language;
}

const ProductAside = ({
  subMenu,
  onReset,
  language,
  linkToAllProducts,
  ariaLabelledby,
  basePath,
  headerText,
}: ProductAsideProps) => (
  <section className="product-aside">
    <ProductAsideHeader
      headerText={headerText}
      ariaLabelledby={ariaLabelledby}
      ariaLabel={language.product}
    />
    <LayoutElement as="nav" ariaLabel={language.product}>
      <ProductAsideNav
        basePath={basePath}
        subMenu={subMenu}
        onReset={onReset}
        linkToAllProducts={linkToAllProducts}
      />
    </LayoutElement>
  </section>
);
export default ProductAside;
