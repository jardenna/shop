import { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import Button from '../../../components/Button';
import useLanguage from '../../../features/language/useLanguage';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import useSubMenu from '../../../features/shop/hooks/useSubMenu';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';
import type { BaseNav } from '../Nav';
import './_sub-nav.scss';

type SubNavProps = {
  adHeading: string;
  subNav: BaseNav[];
  className?: string;
};

const SubNav = ({ subNav, adHeading, className = '' }: SubNavProps) => {
  const { category } = useParams();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  const [selectedCategory, setSelectedCategory] = useState<LinkText>(() => {
    if (category && Object.values(LinkText).includes(category as LinkText)) {
      return category as LinkText;
    }
    return LinkText.Women;
  });
  const filePath = isMobileSize
    ? `/images/adImages/${selectedCategory}.jpg`
    : '/images/ad.png';

  const { subMenu, refetchSubMenu } = useSubMenu(selectedCategory);

  const handleUpdateCategory = (id: LinkText) => {
    setSelectedCategory(id);
  };

  return (
    <div className={`sub-nav-container ${className}`}>
      <ul className="sub-nav">
        {subNav.map(({ linkText, path, infoText, className = '' }) =>
          isMobileSize ? (
            <li key={linkText} className="sub-nav-item">
              <Button
                className={`nav-btn ${selectedCategory === linkText ? 'active' : ''}`}
                variant={BtnVariant.Ghost}
                onClick={() => {
                  handleUpdateCategory(linkText);
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

        {isMobileSize && (
          <li className="mobile-sub-item">
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
          </li>
        )}
        <li
          className="sub-nav-item sub-nav-ad"
          style={{
            backgroundImage: `url(${filePath})`,
          }}
        >
          <p className="ad-heading">{language[adHeading]}.</p>
        </li>
      </ul>
    </div>
  );
};
export default SubNav;
