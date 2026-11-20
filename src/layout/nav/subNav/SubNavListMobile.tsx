import { NavLink } from 'react-router';
import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ProductAsideNav from '../../../features/shop/components/productAside/ProductAsideNav';
import type { Language } from '../../../types/types';
import NavAd from '../NavAd';
import { ShopPath } from '../navConstants';
import type { BaseNav } from '../navLists';
import { subNavConfig } from './subnavConfig';

interface SubNavListMobileProps {
  category: string;
  language: Language;
  subMenu: ProductMenuResponse[];
  subNavList: BaseNav[];
  onReset: () => void;
}

const SubNavListMobile = ({
  subNavList,
  category,
  onReset,
  subMenu,
  language,
}: SubNavListMobileProps) => {
  const { headingKey, textKey } = subNavConfig[category];

  const altText = `${category}AltText`;

  return (
    <ul className="sub-nav">
      {subNavList.map(({ linkText, path }) => (
        <li key={linkText} className={`sub-nav-item `}>
          <NavLink to={path} className="nav-btn">
            {language[linkText]}
          </NavLink>
        </li>
      ))}
      <li className="mobile-sub-item">
        <ProductAsideNav
          basePath={`/${ShopPath.Collection}/${category}`}
          subMenu={subMenu}
          onReset={onReset}
        />
      </li>
      <NavAd
        heading={language[headingKey]}
        text={language[textKey]}
        imageName={category}
        alt={language[altText]}
      />
    </ul>
  );
};

export default SubNavListMobile;
