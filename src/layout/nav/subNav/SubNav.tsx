import { useState } from 'react';
import { useParams } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { LinkText } from '../enums';
import type { SubBaseNav } from '../Nav';
import './_sub-nav.scss';
import SubNavListDesktop from './SubNavListDesktop';
import SubNavListMobile from './SubNavListMobile';

type SubNavProps = {
  heading: string;
  isSubNavShown: boolean;
  subNavList: SubBaseNav[];
  ariaControls?: string;
};

const SubNav = ({
  subNavList,
  heading,
  isSubNavShown,
  ariaControls,
}: SubNavProps) => {
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
    <div
      className={`sub-nav-container ${isSubNavShown ? 'shown' : ''}`}
      id={ariaControls}
    >
      {isMobileSize ? (
        subMenu && (
          <SubNavListMobile
            subNavList={subNavList}
            onClick={handleUpdateCategory}
            subMenu={subMenu}
            category={selectedCategory}
            onReset={refetchSubMenu}
            language={language}
          />
        )
      ) : (
        <SubNavListDesktop
          subNavList={subNavList}
          heading={heading}
          language={language}
        />
      )}
    </div>
  );
};

export default SubNav;
