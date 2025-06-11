import { useState } from 'react';
import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';
import SubNav from './subNav/SubNav';

const NavItem = ({ navItem }: { navItem: NavItemsProps }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={navItem.subNav ? 'has-sub-nav' : ''}
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <NavLink
        to={navItem.path}
        className="nav-item"
        aria-haspopup={!!navItem.subNav}
        aria-expanded={isOpen}
      >
        {navItem.iconName && (
          <span>
            <Icon
              ariaHidden
              iconName={navItem.iconName}
              title={language[navItem.linkText]}
              size={navItem.iconSize}
            />
          </span>
        )}
        <span className="nav-text">{language[navItem.linkText]}</span>
      </NavLink>
      {navItem.subNav && navItem.adHeading && (
        <SubNav subNav={navItem.subNav} adHeading={navItem.adHeading} />
      )}
    </li>
  );
};

export default NavItem;
