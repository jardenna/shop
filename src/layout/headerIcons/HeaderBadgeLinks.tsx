import { Link } from 'react-router';
import CountBadge from '../../components/countBadge/CountBadge';
import IconContent from '../../components/IconContent';
import { IconName } from '../../types/enums';
import { ShopPath } from '../nav/enums';

interface HeaderBadgeLinksProps {
  ariaLabel: string;
  count: number | null;
  iconName: IconName;
  itemText: string;
  itemUpdatedText: string;
  linkTo: ShopPath;
}

const HeaderBadgeLinks = ({
  ariaLabel,
  count,
  linkTo,
  itemText,
  itemUpdatedText,
  iconName,
}: HeaderBadgeLinksProps) => (
  <span className="position-relative">
    <Link to={linkTo} className="btn btn-ghost">
      <IconContent iconName={iconName} ariaLabel={ariaLabel} />
    </Link>
    {count && count > 0 && (
      <CountBadge
        count={count}
        ariaLabel={`${itemUpdatedText} ${count} ${itemText}`}
      />
    )}
  </span>
);

export default HeaderBadgeLinks;
