import { useState } from 'react';
import { useParams } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { LinkText } from '../enums';
import type { BaseNav } from '../Nav';
import NavAd from '../NavAd';
import './_sub-nav.scss';
import SubNavDesktop from './SubNavDesktop';
import SubNavMobileList from './SubNavMobileList';

type SubNavProps = {
  adHeading: string;
  isSubNavShown: boolean;
  subNavList: BaseNav[];
};

const SubNav = ({ subNavList, adHeading, isSubNavShown }: SubNavProps) => {
  const { category } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const initialCategory =
    category && Object.values(LinkText).includes(category as LinkText)
      ? (category as LinkText)
      : LinkText.Women;

  const [selectedCategory, setSelectedCategory] =
    useState<LinkText>(initialCategory);

  const { subMenu, refetchSubMenu } = useSubMenu(selectedCategory);
  const handleUpdateCategory = (id: LinkText) => {
    setSelectedCategory(id);
  };

  return (
    <div className={`sub-nav-container ${isSubNavShown ? 'shown' : ''}`}>
      {isMobileSize ? (
        subMenu && (
          <SubNavMobileList
            subNavList={subNavList}
            onClick={handleUpdateCategory}
            subMenu={subMenu}
            category={selectedCategory}
            onReset={refetchSubMenu}
          />
        )
      ) : (
        <ul className="sub-nav">
          {subNavList.map(({ linkText, infoText, path, className = '' }) => (
            <SubNavDesktop
              key={linkText}
              className={className}
              subNavHeading={language[linkText]}
              subNavText={infoText ? language[infoText] : ''}
              linkText={language[linkText]}
              linkTo={path}
            />
          ))}
          <NavAd heading={language[adHeading]} imageName="ad" />
        </ul>
      )}
    </div>
  );
};

export default SubNav;
