import { Link } from 'react-router';
import { ShopPath } from '../../../../layout/nav/enums';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';
import EmptyStateContent from './EmptyStateContent';

interface BaseEmptyStateProps {
  emptyStateCtaText: string;
  emptyStateText: string;
  emptyStateTitle: string;
  src: string;
}

const EmptyState = ({
  emptyStateText,
  emptyStateTitle,
  emptyStateCtaText,
  src,
}: BaseEmptyStateProps) => (
  <EmptyStateContent
    emptyStateTitle={emptyStateTitle}
    emptyStateText={emptyStateText}
    src={src}
  >
    <Link
      to={`/${ShopPath.Collection}`}
      className={`btn btn-${BtnVariant.Primary}`}
    >
      {emptyStateCtaText}
    </Link>
  </EmptyStateContent>
);

export default EmptyState;
