import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import { LinkText } from './enums';
import NavItemList from './NavItemList';

export type NavItemsProps = {
  linkText: LinkText;
  path: string;
  iconName?: IconName;
  iconSize?: string;
};

export type ActionBtnProps = {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
};

type NavProps = {
  navList: NavItemsProps[];
  className?: string;
  iconBtn?: ReactNode;
};

const Nav = ({ navList, iconBtn, className = '' }: NavProps) => {
  const { language } = useLanguage();

  return (
    <div className={`main-nav ${className}`}>
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
      {iconBtn && iconBtn}
    </div>
  );
};

export default Nav;
