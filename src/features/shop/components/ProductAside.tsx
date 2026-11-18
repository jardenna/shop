import LayoutElement from '../../../layout/LayoutElement';
import { Language } from '../../../types/types';
import ProductAsideHeader from './ProductAsideHeader';
import ProductAsideNav, { ProductAsideNavProps } from './ProductAsideNav';
import './productAside.styles.scss';

interface ProductAsideProps extends ProductAsideNavProps {
  ariaLabelledby: string;
  headerText: string;
  language: Language;
  className?: string;
}

const ProductAside = ({
  subMenu,
  onReset,
  language,
  linkTo,
  ariaLabelledby,
  basePath,
  headerText,
  className = '',
}: ProductAsideProps) => (
  <section className="product-aside">
    <ProductAsideHeader
      headerText={headerText}
      ariaLabelledby={ariaLabelledby}
      ariaLabel={language.product}
    />
    <div className={`product-aside ${className}`}>
      <LayoutElement as="nav" ariaLabel={language.collection}>
        <ProductAsideNav
          basePath={basePath}
          subMenu={subMenu}
          onReset={onReset}
          linkTo={linkTo}
        />
      </LayoutElement>
    </div>
  </section>
);
export default ProductAside;
