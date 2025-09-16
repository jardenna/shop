import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Button from '../../../components/Button';
import useLanguage from '../../../features/language/useLanguage';
import CollectionNav from '../../../features/shop/components/CollectionNav';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';
import { BaseNav } from '../Nav';

type SubNavMobileListProps = {
  category: LinkText;
  subMenu: ProductMenuResponse[];
  subNavList: BaseNav[];
  className?: string;
  onClick: (id: LinkText) => void;
  onReset: () => void;
};

const SubNavMobileList = ({
  subNavList,
  onClick,
  category,
  onReset,
  subMenu,
}: SubNavMobileListProps) => {
  const { language } = useLanguage();

  const categoryConfig: any = {
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
  const filePath = `/images/adImages/${category}.jpg`;

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

      <li
        className="sub-nav-item sub-nav-ad"
        style={{ backgroundImage: `url(${filePath})` }}
      >
        <p className="ad-heading">{language[headingKey]}</p>
        <p className="ad-text">{language[textKey]}</p>
      </li>
    </ul>
  );
};

export default SubNavMobileList;
