import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useKeyPress from '../../hooks/useKeyPress';
import { IconName, KeyCode } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import { LinkText } from './enums';
import NavItem from './NavItem';

export type BaseNav = {
  linkText: LinkText;
  path: string;
  className?: string;
  end?: boolean;
  heading?: string;
  iconName?: IconName;
};

type OmittedBaseNav = Omit<BaseNav, 'end' | 'heading' | 'iconName'>;

export type SubBaseNav = OmittedBaseNav & {
  infoText: string;
};

export type NavListProps = BaseNav & {
  subNavList?: SubBaseNav[];
};

export type NavProps = {
  ariaLabel: string;
  navList: NavListProps[];
  className?: string;
  hideAriaHasPopup?: boolean;
};

const Nav = ({ navList, ariaLabel, className, hideAriaHasPopup }: NavProps) => {
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
        {navList.map((navItem) => (
          <NavItem
            key={navItem.linkText}
            navItem={navItem}
            ariaControls={navItem.subNavList ? 'sub-menu' : undefined}
            ariaHasPopup={
              navItem.subNavList && !hideAriaHasPopup ? 'menu' : undefined
            }
            onMouseEnter={navItem.subNavList && handleShowSubNav}
            onMouseLeave={navItem.subNavList && handleHideSubNav}
            onFocus={navItem.subNavList && handleShowSubNav}
            ariaExpanded={isSubNavShown ? isSubNavShown : undefined}
            onBlur={(event: React.FocusEvent<HTMLLIElement>) => {
              if (
                !event.currentTarget.contains(event.relatedTarget) &&
                navItem.subNavList
              ) {
                // ensures that focus inside the submenu won't immediately close it
                handleHideSubNav();
              }
            }}
          />
        ))}
      </ul>
    </LayoutElement>
  );
};

export default Nav;
