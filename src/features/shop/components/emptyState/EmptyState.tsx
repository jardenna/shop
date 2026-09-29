import { Link } from 'react-router';
import Picture from '../../../../components/Picture';
import { ShopPath } from '../../../../layout/nav/enums';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';

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
  <section className="empty-state">
    <div>
      <Picture
        src={`${src}.png`}
        srcSet={src}
        alt=""
        priority
        className="empty-state-img"
      />
    </div>
    <div className="empty-state-info">
      <h2 className="empty-space-heading">{emptyStateTitle}</h2>
      <p role="status" aria-atomic="true">
        {emptyStateText}.
      </p>
      <Link
        to={`/${ShopPath.Collection}`}
        className={`btn btn-${BtnVariant.Primary}`}
      >
        {emptyStateCtaText}
      </Link>
    </div>
  </section>
);

export default EmptyState;
