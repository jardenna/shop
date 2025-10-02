import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import type { NavItemsProps } from './Nav';
import SubNav from './subNav/SubNav';

const NavItem = ({
  navItem,
  hideAriaHasPopup,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  ariaExpanded,
  onBlur,
}: {
  navItem: NavItemsProps;
  ariaExpanded?: any;
  hideAriaHasPopup?: boolean;
  onFocus?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onBlur: (event: React.FocusEvent<HTMLLIElement>) => void;
}) => {
  const { language } = useLanguage();

  return (
    <li
      className={`nav-item ${navItem.subNavList ? 'has-sub-nav' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <NavLink
        to={navItem.path}
        end={navItem.end}
        className="nav-link"
        aria-controls="sub-menu"
        aria-haspopup={
          navItem.subNavList && !hideAriaHasPopup ? 'menu' : undefined
        }
        aria-expanded={ariaExpanded}
      >
        {navItem.iconName && (
          <span>
            <Icon
              iconName={navItem.iconName}
              title={language[navItem.linkText]}
            />
          </span>
        )}
        <span className="nav-text">{language[navItem.linkText]}</span>
      </NavLink>
      {navItem.subNavList && navItem.heading && (
        <SubNav
          subNavList={navItem.subNavList}
          heading={navItem.heading}
          isSubNavShown={ariaExpanded}
          id="sub-menu"
        />
      )}
    </li>
  );
};

export default NavItem;
