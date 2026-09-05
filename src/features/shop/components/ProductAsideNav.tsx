import { ErrorBoundary } from 'react-error-boundary';
import { NavLink } from 'react-router';
import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import { ShopPath } from '../../../layout/nav/enums';
import { translateKey } from '../../../utils/utils';
import { useLanguage } from '../../language/useLanguage';

export interface ProductAsideNavProps {
  subMenu: ProductMenuResponse[];
  category?: string;
  linkTo?: string;
  getProductLink: (id: string) => string;
  onReset: () => void;
}

const ProductAsideNav = ({
  subMenu,
  category,
  onReset,
  getProductLink,
  linkTo = `/${ShopPath.Collection}/${category}`,
}: ProductAsideNavProps) => {
  const { language } = useLanguage();

  return (
    <ul className="product-nav-list">
      <li className="product-nav-item">
        <NavLink to={linkTo} end>
          {language.showAll}
        </NavLink>
      </li>

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {subMenu.map(({ label, categoryId }) => (
          <li className="product-nav-item" key={categoryId}>
            <NavLink to={getProductLink(categoryId)}>
              {translateKey(label, language)}
            </NavLink>
          </li>
        ))}
      </ErrorBoundary>
    </ul>
  );
};

export default ProductAsideNav;
