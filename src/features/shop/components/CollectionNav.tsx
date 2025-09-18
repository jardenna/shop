import { ErrorBoundary } from 'react-error-boundary';
import { NavLink } from 'react-router';
import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import { ShopPath } from '../../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type CollectionNavProps = {
  category: string;
  subMenu: ProductMenuResponse[];
  onReset: () => void;
};

const CollectionNav = ({ subMenu, category, onReset }: CollectionNavProps) => {
  const { language } = useLanguage();

  return (
    <ul className="collection-nav-list">
      <li className="collection-nav-item">
        <NavLink to={`/${ShopPath.Collection}/${category}`} end>
          {language.showAll}
        </NavLink>
      </li>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <>
          {subMenu.map(({ label, categoryId }) => (
            <li className="collection-nav-item" key={categoryId}>
              <NavLink to={`/${ShopPath.Collection}/${category}/${categoryId}`}>
                {getlowerCaseFirstLetter(label, language)}
              </NavLink>
            </li>
          ))}
        </>
      </ErrorBoundary>
    </ul>
  );
};
export default CollectionNav;
