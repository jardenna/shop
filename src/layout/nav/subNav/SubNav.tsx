import { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { LinkText } from '../enums';
import type { BaseNav } from '../Nav';
import './_sub-nav.scss';
import SubNavMobile from './SubNavMobile';

export type SubNavItemProps = {
  linkText: LinkText; // enum value for the link/category
  path: string; // URL path for desktop NavLink
  className?: string; // optional extra CSS class
  infoText?: any; // optional translation key for info text
};

type SubNavProps = {
  adHeading: string;
  subNav: BaseNav[];
  className?: string;
};

const SubNav = ({ subNav, adHeading, className = '' }: SubNavProps) => {
  const { category } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const initialCategory =
    category && Object.values(LinkText).includes(category as LinkText)
      ? (category as LinkText)
      : LinkText.Women;

  const [selectedCategory, setSelectedCategory] =
    useState<LinkText>(initialCategory);

  const filePath = isMobileSize
    ? `/images/adImages/${selectedCategory}.jpg`
    : '/images/ad.png';

  const { subMenu, refetchSubMenu } = useSubMenu(selectedCategory);
  const handleUpdateCategory = (id: LinkText) => {
    console.log(id);

    setSelectedCategory(id);
  };

  const renderDesktopItem = ({
    linkText,
    path,
    infoText,
    className = '',
  }: SubNavItemProps) => (
    <li className={`sub-nav-item ${className}`} key={linkText}>
      <section className="sub-nav-content">
        <h2 className="sub-nav-heading">{language[linkText]}</h2>
        <p className="sub-nav-text">{infoText ? language[infoText] : ''}</p>
      </section>
      <div className="sub-nav-link">
        <NavLink to={path} className="btn btn-primary">
          {language.shopNow}
        </NavLink>
      </div>
    </li>
  );

  return (
    <div className={`sub-nav-container ${className}`}>
      <ul className="sub-nav">
        {subNav.map((item, index) =>
          isMobileSize ? (
            <SubNavMobile
              key={index}
              onSelectedCategory={handleUpdateCategory}
              btnText={item.linkText}
            />
          ) : (
            renderDesktopItem(item)
          ),
        )}

        {isMobileSize && subMenu && (
          <li className="mobile-sub-item">
            <CollectionNav
              subMenu={subMenu}
              category={selectedCategory}
              showAllText={language.showAll}
              ariaLabel={language.page}
              onReset={refetchSubMenu}
            />
          </li>
        )}

        <li
          className="sub-nav-item sub-nav-ad"
          style={{ backgroundImage: `url(${filePath})` }}
        >
          <p className="ad-heading">{language[adHeading]}.</p>
        </li>
      </ul>
    </div>
  );
};

export default SubNav;
