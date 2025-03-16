import { FC } from 'react';
import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';

interface NavItemProps {
  navItem: NavItemsProps;
}

const NavItem: FC<NavItemProps> = ({ navItem }) => {
  const { language } = useLanguage();

  return (
    <li key={navItem.linkText}>
      <NavLink to={navItem.path} className="nav-item">
        {navItem.iconName && (
          <span>
            <Icon
              iconName={navItem.iconName}
              title={language[navItem.linkText]}
            />
          </span>
        )}
        <span>{language[navItem.linkText]}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
