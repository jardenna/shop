import { FC, ReactNode } from 'react';

import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import { LinkText, MainPath } from './enums';
import NavItemList from './NavItemList';

export interface NavItemsProps {
  linkText: LinkText;
  path: MainPath | string;
  iconName?: IconName;
}

export interface ActionBtnProps {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

interface NavProps {
  navList: NavItemsProps[];
  className?: string;
  iconBtn?: ReactNode;
}

const Nav: FC<NavProps> = ({ navList, iconBtn, className = '' }) => {
  const { language } = useLanguage();

  return (
    <nav className={`main-nav ${className}`}>
      {iconBtn && iconBtn}
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
    </nav>
  );
};

export default Nav;
