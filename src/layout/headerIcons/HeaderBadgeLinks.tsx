import { Link } from 'react-router';
import CountBadge from '../../components/countBadge/CountBadge';
import IconContent from '../../components/IconContent';
import type { IconNameValue } from '../../types/constants';
import type { ShopPathValue } from '../nav/navTypes';

interface HeaderBadgeLinksProps {
  ariaLabel: string;
  count: number;
  iconName: IconNameValue;
  itemText: string;
  itemUpdatedText: string;
  linkTo: ShopPathValue;
}

const HeaderBadgeLinks = ({
  ariaLabel,
  count,
  linkTo,
  itemText,
  itemUpdatedText,
  iconName,
}: HeaderBadgeLinksProps) => (
  <div className="position-relative">
    <Link to={linkTo} className="btn btn-ghost">
      <IconContent iconName={iconName} ariaLabel={ariaLabel} />
    </Link>
    {count > 0 && (
      <CountBadge
        count={count}
        ariaLabel={`${itemUpdatedText} ${count} ${itemText}`}
      />
    )}
  </div>
);

export default HeaderBadgeLinks;
