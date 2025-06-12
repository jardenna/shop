import { useState } from 'react';
import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import { NavItemsProps } from './Nav';
import SubNav from './subNav/SubNav';

const NavItem = ({
  navItem,
  hideAria,
}: {
  navItem: NavItemsProps;
  hideAria?: boolean;
}) => {
  const { language } = useLanguage();
  const [isSubNavShown, setIsSubNavShown] = useState(false);
  const aria = navItem.subNav && !hideAria;

  useKeyPress(() => {
    setIsSubNavShown(false);
  }, [KeyCode.Esc]);

  return (
    <li
      className={navItem.subNav ? 'has-sub-nav' : ''}
      onMouseEnter={() => {
        setIsSubNavShown(true);
      }}
      onMouseLeave={() => {
        setIsSubNavShown(false);
      }}
    >
      <NavLink
        to={navItem.path}
        className="nav-item"
        aria-haspopup={aria ? true : undefined}
        aria-expanded={aria ? isSubNavShown : undefined}
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
        <SubNav
          subNav={navItem.subNav}
          adHeading={navItem.adHeading}
          className={`sub-nav-container ${isSubNavShown ? 'shown' : ''}`}
        />
      )}
    </li>
  );
};

export default NavItem;
