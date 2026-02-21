import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import type { AriaHasPopup, FocusEventType } from '../../types/types';
import type { NavListProps } from './Nav';
import SubNav from './subNav/SubNav';

type NavItemProps = {
  navItem: NavListProps;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: AriaHasPopup;
  onBlur?: (event: FocusEventType) => void;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const NavItem = ({
  navItem,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  ariaExpanded,
  ariaHasPopup,
  onBlur,
  ariaControls,
}: NavItemProps) => {
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
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup || undefined}
        aria-expanded={ariaExpanded}
      >
        {navItem.iconName && (
          <span>
            <Icon iconName={navItem.iconName} />
          </span>
        )}
        <span className="nav-text">{language[navItem.linkText]}</span>
      </NavLink>
      {navItem.subNavList && navItem.heading && (
        <SubNav
          subNavList={navItem.subNavList}
          heading={navItem.heading}
          isSubNavShown={ariaExpanded || false}
          ariaControls={ariaControls}
        />
      )}
    </li>
  );
};

export default NavItem;
