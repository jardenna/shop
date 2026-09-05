import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Button from '../../../components/Button';
import ProductAsideNav from '../../../features/shop/components/ProductAsideNav';
import { BtnVariant } from '../../../types/enums';
import { LinkText, ShopPath } from '../enums';
import { BaseNav } from '../Nav';
import NavAd from '../NavAd';
import { subNavConfig } from './subnavConfig';

type SubNavListMobileProps = {
  category: LinkText;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[];
  subNavList: BaseNav[];
  onClick: (id: LinkText) => void;
  onReset: () => void;
};

const SubNavListMobile = ({
  subNavList,
  onClick,
  category,
  onReset,
  subMenu,
  language,
}: SubNavListMobileProps) => {
  const { headingKey, textKey } = subNavConfig[category];

  const altText = `${category}AltText`;

  return (
    <ul className="sub-nav">
      {subNavList.map(({ linkText }) => (
        <li key={linkText} className="sub-nav-item">
          <Button
            className={`nav-btn ${category === linkText ? 'active' : ''}`}
            variant={BtnVariant.Ghost}
            onClick={() => {
              onClick(linkText);
            }}
          >
            {language[linkText]}
          </Button>
        </li>
      ))}
      <li className="mobile-sub-item">
        <ProductAsideNav
          getProductLink={(productId) =>
            `/${ShopPath.Collection}/${category}/${productId}`
          }
          subMenu={subMenu}
          category={category}
          onReset={onReset}
        />
      </li>
      <NavAd
        heading={language[headingKey]}
        text={language[textKey]}
        imageName={category}
        alt={language[altText]}
      />
    </ul>
  );
};

export default SubNavListMobile;
