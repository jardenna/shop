import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import type { NavItemsProps } from './Nav';
import SubNav from './subNav/SubNav';

const NavItem = ({ navItem }: { navItem: NavItemsProps }) => {
  const location = useLocation();
  const { language } = useLanguage();
  const [isSubNavShown, setIsSubNavShown] = useState(false);

  const handleShowSubNav = () => {
    setIsSubNavShown(true);
  };

  const handleHideSubNav = () => {
    setIsSubNavShown(false);
  };

  useEffect(() => {
    handleHideSubNav();
  }, [location]);

  useKeyPress(() => {
    handleHideSubNav();
  }, [KeyCode.Esc]);

  return (
    <li
      className={`nav-item ${navItem.subNavList ? 'has-sub-nav' : ''}`}
      onMouseEnter={handleShowSubNav}
      onMouseLeave={handleHideSubNav}
      onFocus={handleShowSubNav}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // ensures that focus inside the submenu won't immediately close it
          handleHideSubNav();
        }
      }}
    >
      <NavLink
        to={navItem.path}
        className="nav-link"
        aria-haspopup={navItem.subNavList ? true : undefined}
        aria-expanded={isSubNavShown ? isSubNavShown : undefined}
      >
        {navItem.iconName && (
          <span>
            <Icon
              iconName={navItem.iconName}
              title={language[navItem.linkText]}
              size={navItem.iconSize}
            />
          </span>
        )}
        <span className="nav-text">{language[navItem.linkText]}</span>
      </NavLink>
      {navItem.subNavList && navItem.adHeading && (
        <SubNav
          subNavList={navItem.subNavList}
          adHeading={navItem.adHeading}
          isSubNavShown={isSubNavShown}
        />
      )}
    </li>
  );
};

export default NavItem;
