import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useKeyPress } from '../../hooks/useKeyPress';
import { IconName, KeyCode } from '../../types/enums';
import { FocusEventType } from '../../types/types';
import LayoutElement from '../LayoutElement';
import { LinkText } from './enums';
import NavItem from './NavItem';

export interface BaseNav {
  linkText: LinkText;
  path: string;
}

export interface AccountNavList {
  linkText: LinkText;
  path: string;
  end?: boolean;
}

export interface AdminNavList {
  iconName: IconName;
  linkText: LinkText;
  path: string;
}

export interface SubBaseNavList {
  infoText: string;
  linkText: LinkText;
  path: string;
  className?: string;
}

export interface NavListProps {
  linkText: LinkText;
  path: string;
  end?: boolean;
  heading?: string;
  iconName?: IconName;
  subNavList?: SubBaseNavList[];
  type?: string;
}

export interface NavProps {
  ariaLabel: string;
  navList: NavListProps[];
  className?: string;
  hideAriaHasPopup?: boolean;
}

const Nav = ({ navList, className, hideAriaHasPopup, ariaLabel }: NavProps) => {
  const location = useLocation();
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
    <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
      <ul className="nav-list">
        {navList.map((navItem) => {
          const hasSubNav = Boolean(navItem.subNavList);

          const eventHandlers = hasSubNav
            ? {
                onMouseEnter: handleShowSubNav,
                onMouseLeave: handleHideSubNav,
                onFocus: handleShowSubNav,
                onBlur: (event: FocusEventType) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    handleHideSubNav();
                  }
                },
              }
            : {};

          return (
            <NavItem
              key={navItem.linkText}
              navItem={navItem}
              ariaControls={hasSubNav ? 'sub-menu' : undefined}
              ariaHasPopup={hasSubNav && !hideAriaHasPopup ? 'menu' : undefined}
              ariaExpanded={(hasSubNav && isSubNavShown) || undefined}
              {...eventHandlers}
            />
          );
        })}
      </ul>
    </LayoutElement>
  );
};

export default Nav;
