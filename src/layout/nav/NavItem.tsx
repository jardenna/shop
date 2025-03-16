import { FC } from 'react';
import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';

interface NavItemProps {
  navItem: NavItemsProps;
}

const NavItem: FC<NavItemProps> = ({
  navItem: { path, iconName, linkText },
}) => {
  const { language } = useLanguage();

  return (
    <li>
      <NavLink to={path} className="nav-item">
        {iconName && (
          <span>
            <Icon iconName={iconName} title={language[linkText]} />
          </span>
        )}
        <span>{language[linkText]}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
