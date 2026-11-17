import { NavLink } from 'react-router';
import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ProductAsideNav from '../../../features/shop/components/ProductAsideNav';
import { Language } from '../../../types/types';
import { LinkText, ShopPath } from '../enums';
import NavAd from '../NavAd';
import { BaseNav } from '../navLists';
import { subNavConfig } from './subnavConfig';

interface SubNavListMobileProps {
  category: LinkText;
  language: Language;
  subMenu: ProductMenuResponse[];
  subNavList: BaseNav[];
  onClick: (id: LinkText) => void;
  onReset: () => void;
}

const SubNavListMobile = ({
  subNavList,
  onClick,
  category,
  onReset,
  subMenu,
  language,
}: SubNavListMobileProps) => {
  const { headingKey, textKey } = subNavConfig[category];
  console.log(onClick);

  const altText = `${category}AltText`;

  return (
    <ul className="sub-nav">
      {subNavList.map(({ linkText, path }) => (
        <li key={linkText} className={`sub-nav-item `}>
          <NavLink
            to={path}
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
          >
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
