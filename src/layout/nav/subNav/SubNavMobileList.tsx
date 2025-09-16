import { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Button from '../../../components/Button';
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
}: SubNavMobileListProps) => (
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
  </ul>
);

export default SubNavMobileList;
