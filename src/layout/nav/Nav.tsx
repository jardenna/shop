import { useState } from 'react';
import { useLocation } from 'react-router';
import { useKeyPress } from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import type { FocusEventType } from '../../types/types';
import LayoutElement from '../LayoutElement';
import NavItem from './NavItem';
import type { NavListProps } from './navLists';

export interface NavProps {
  ariaLabel: string;
  navList: NavListProps[];
  className?: string;
  hideAriaHasPopup?: boolean;
  unReadCount?: number;
}

const Nav = ({
  navList,
  className,
  hideAriaHasPopup,
  ariaLabel,
  unReadCount,
}: NavProps) => {
  const location = useLocation();
  const [openedLocationKey, setOpenedLocationKey] = useState<string | null>(
    null,
  );

  const isSubNavShown = openedLocationKey === location.key;

  const handleShowSubNav = () => {
    setOpenedLocationKey(location.key);
  };

  const handleHideSubNav = () => {
    setOpenedLocationKey(null);
  };

  useKeyPress(handleHideSubNav, [KeyCode.Esc]);

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
              unReadCount={unReadCount}
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
