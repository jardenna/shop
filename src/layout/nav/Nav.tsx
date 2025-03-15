import { FC } from 'react';

import useLanguage from '../../features/language/useLanguage';
import './_nav.scss';
import { LinkText, MainPath } from './enums';
import NavItemList from './NavItemList';

export interface NavItemsProps {
  linkText: LinkText;
  path: MainPath;
}

export interface ActionBtnProps {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

interface NavProps {
  navList: NavItemsProps[];
}

const Nav: FC<NavProps> = ({ navList }) => {
  const { language } = useLanguage();

  return (
    <section className="main-nav">
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
    </section>
  );
};

export default Nav;
