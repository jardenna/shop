import { Link } from 'react-router';
import { ShopPath } from '../../../../layout/nav/enums';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';
import EmptyStateContent, { BaseEmptyStateProps } from './EmptyStateContent';

interface EmptyStateProps extends BaseEmptyStateProps {
  emptyStateCtaText: string;
}

const EmptyState = ({
  emptyStateText,
  emptyStateTitle,
  emptyStateCtaText,
  src,
}: EmptyStateProps) => (
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
