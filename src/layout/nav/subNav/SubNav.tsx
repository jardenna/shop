import { useState } from 'react';
import { useParams } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { LinkText } from '../enums';
import type { BaseNav } from '../Nav';
import './_sub-nav.scss';
import SubNavDesktop from './SubNavDesktop';
import SubNavMobileList from './SubNavMobileList';

export type SubNavItemProps = {
  linkText: LinkText; // enum value for the link/category
  path: string; // URL path for desktop NavLink
  className?: string; // optional extra CSS class
  infoText?: any; // optional translation key for info text
};

type SubNavProps = {
  adHeading: string;
  subNavList: BaseNav[];
  className?: string;
};

const SubNav = ({ subNavList, adHeading, className = '' }: SubNavProps) => {
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
    setSelectedCategory(id);
  };

  return (
    <div className={`sub-nav-container ${className}`}>
      {isMobileSize && subMenu && (
        <SubNavMobileList
          subNavList={subNavList}
          onClick={handleUpdateCategory}
          subMenu={subMenu}
          category={selectedCategory}
          onReset={refetchSubMenu}
        />
      )}
      <ul className="sub-nav">
        {!isMobileSize &&
          subNavList.map(({ linkText, infoText, path }) => (
            <SubNavDesktop
              key={linkText}
              className={className}
              subNavHeading={language[linkText]}
              subNavText={infoText ? language[infoText] : ''}
              linkText={language[linkText]}
              linkTo={path}
            />
          ))}

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
