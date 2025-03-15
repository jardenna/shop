import { FC } from 'react';

import useLanguage from '../../features/language/useLanguage';
import './_nav.scss';
import NavItemList from './NavItemList';
import { navList } from './navList';

export interface ActionBtnProps {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

const Nav: FC = () => {
  const { language } = useLanguage();

  return (
    <section className="main-nav">
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
    </section>
  );
};

export default Nav;
