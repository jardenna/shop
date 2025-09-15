import { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import Button from '../../../components/Button';
import useLanguage from '../../../features/language/useLanguage';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { BtnVariant } from '../../../types/enums';
import type { BaseNav } from '../Nav';
import './_sub-nav.scss';

type SubNavProps = {
  adHeading: string;
  subNav: BaseNav[];
  className?: string;
};

const SubNav = ({ subNav, adHeading, className = '' }: SubNavProps) => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<any>(category);

  const { subMenu, refetchSubMenu } = useSubMenu({
    category: selectedCategory,
  });
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const handleClick = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className={`sub-nav-container ${className}`}>
      <ul className="sub-nav">
        {subNav.map(({ linkText, path, infoText, className = '' }) =>
          isMobileSize ? (
            <li key={linkText} className="sub-nav-item">
              <Button
                variant={BtnVariant.Ghost}
                onClick={() => {
                  handleClick(linkText);
                }}
              >
                {language[linkText]}
              </Button>
            </li>
          ) : (
            <li className={`sub-nav-item ${className}`} key={linkText}>
              <section className="sub-nav-content">
                <h2 className="sub-nav-heading">{language[linkText]}</h2>
                <p className="sub-nav-text">
                  {infoText ? language[infoText] : ''}
                </p>
              </section>
              <div className="sub-nav-link">
                <NavLink to={path} className="btn btn-primary">
                  {language.shopNow}
                </NavLink>
              </div>
            </li>
          ),
        )}
        <li className="sub-nav-item sub-nav-ad">
          <p className="ad-heading">{language[adHeading]}.</p>
        </li>
      </ul>
      {subMenu && (
        <CollectionNav
          subMenu={subMenu}
          category={selectedCategory}
          showAllText={language.showAll}
          ariaLabel={language.page}
          onReset={() => {
            refetchSubMenu();
          }}
        />
      )}
    </div>
  );
};
export default SubNav;
