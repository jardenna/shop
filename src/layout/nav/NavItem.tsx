import { useState } from 'react';
import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';

const NavItem = ({ navItem }: { navItem: NavItemsProps }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={navItem.subNav ? 'has-sub-nav' : ''}
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <NavLink
        to={navItem.path}
        className="nav-item"
        aria-haspopup={!!navItem.subNav}
        aria-expanded={isOpen}
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

      {navItem.subNav && (
        <div className="sub-nav">
          <ul className="sub-nav-container">
            {navItem.subNav.map(({ linkText, path, infoText }) => (
              <li key={linkText}>
                <section className="sub-nav-content">
                  <NavLink to={path}>{language[linkText]}</NavLink>
                  <p>{infoText}</p>
                </section>
              </li>
            ))}
          </ul>
          <section className="brand-container">
            <h2>Selected brands</h2>
            <div className="brand-content">
              <div className="brand-item">Brand</div>
              <div className="brand-item">Brand 1</div>
              <div className="brand-item">Brand 2</div>
            </div>
          </section>
        </div>
      )}
    </li>
  );
};

export default NavItem;
