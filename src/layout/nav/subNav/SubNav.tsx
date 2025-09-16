import { useState } from 'react';
import { useParams } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { LinkText } from '../enums';
import type { BaseNav } from '../Nav';
import './_sub-nav.scss';
import SubNavDesktopList from './SubNavDesktopList';
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
            language={language}
          />
        )
      ) : (
        <SubNavDesktopList
          subNavList={subNavList}
          adHeading={adHeading}
          language={language}
        />
      )}
    </div>
  );
};

export default SubNav;
