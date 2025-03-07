import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { LinkText, MainPath } from './enums';
import NavItem from './NavItem';

export interface NavItemsProps {
  linkText: LinkText;
  path: MainPath;
}

interface NavItemListProps {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
  className?: string;
}

const NavItemList: FC<NavItemListProps> = ({
  navItemsList,
  ariaLabel,
  className = '',
}) => {
  const { language } = useLanguage();

  const localizedNavItems = navItemsList.map((item) => ({
    ...item,
    linkText: (language[item.linkText] as LinkText) || item.linkText, // Fallback to the key if translation is missing
  }));

  return (
    <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
      <ul className="nav-list">
        {localizedNavItems.map((navItem) => (
          <NavItem key={navItem.linkText} navItem={navItem} />
        ))}
      </ul>
    </LayoutElement>
  );
};

export default NavItemList;
