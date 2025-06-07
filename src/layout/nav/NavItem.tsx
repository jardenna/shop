import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';

const NavItem = ({ navItem }: { navItem: NavItemsProps }) => {
  const { language } = useLanguage();

  return (
    <li>
      <NavLink to={navItem.path} className="nav-item">
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

      {navItem.subNav && (
        <TogglePanel ariaControls="aa">
          <ul>
            {navItem.subNav.map((sub) => (
              <li key={sub.linkText}>
                <NavLink to={sub.path}>{language[sub.linkText]}</NavLink>
              </li>
            ))}
          </ul>
        </TogglePanel>
      )}
    </li>
  );
};

export default NavItem;
