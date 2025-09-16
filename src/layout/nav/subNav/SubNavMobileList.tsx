import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Button from '../../../components/Button';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';
import { BaseNav } from '../Nav';
import NavAd from '../NavAd';

type SubNavMobileListProps = {
  category: LinkText;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[];
  subNavList: BaseNav[];
  className?: string;
  onClick: (id: LinkText) => void;
  onReset: () => void;
};

type CategoryConfigItem = {
  headingKey: string;
  textKey: string;
};

const SubNavMobileList = ({
  subNavList,
  onClick,
  category,
  onReset,
  subMenu,
  language,
}: SubNavMobileListProps) => {
  const categoryConfig: Record<string, CategoryConfigItem> = {
    kids: {
      headingKey: 'shopKidsHeading',
      textKey: 'shopKidsMenuText',
    },
    men: {
      headingKey: 'shopMenHeading',
      textKey: 'shopMenMenuText',
    },
    women: {
      headingKey: 'shopWomenHeading',
      textKey: 'shopWomenMenuText',
    },
  };

  const { headingKey, textKey } = categoryConfig[category];

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
            {linkText}
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

export default SubNavMobileList;
