import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import type { NavItemsProps } from './Nav';
import SubNav from './subNav/SubNav';

const NavItem = ({
  navItem,
  hideAria,
}: {
  navItem: NavItemsProps;
  hideAria?: boolean;
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const [isSubNavShown, setIsSubNavShown] = useState(false);
  const aria = navItem.subNav && !hideAria;

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
      className={`nav-item ${navItem.subNav ? 'has-sub-nav' : ''}`}
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
        aria-haspopup={aria ? true : undefined}
        aria-expanded={aria ? isSubNavShown : undefined}
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
      {navItem.subNav && navItem.adHeading && (
        <SubNav
          subNav={navItem.subNav}
          adHeading={navItem.adHeading}
          className={isSubNavShown ? 'shown' : ''}
        />
      )}
    </li>
  );
};

export default NavItem;
