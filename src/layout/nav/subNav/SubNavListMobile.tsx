import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Button from '../../../components/Button';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';
import { BaseNav } from '../Nav';
import NavAd from '../NavAd';
import subNavConfig from './subnavConfig';

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
        <CollectionNav
          subMenu={subMenu}
          category={category}
          ariaLabel="language.page"
          onReset={onReset}
        />
      </li>
      <NavAd
        heading={language[headingKey]}
        text={language[textKey]}
        imageName={category}
      />
    </ul>
  );
};

export default SubNavListMobile;
