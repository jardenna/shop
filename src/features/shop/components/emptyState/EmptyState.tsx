import { Link } from 'react-router';
import Picture from '../../../../components/Picture';
import MainPageContainer from '../../../../pages/pageContainer/MainPageContainer';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';

interface BaseEmptyStateProps {
  emptyStateCtaText: string;
  emptyStateText: string;
  emptyStateTitle: string;
  linkTo: string;
  pageHeading: string;
  src: string;
  btnVariant?: BtnVariant;
}

const EmptyState = ({
  emptyStateText,
  emptyStateTitle,
  emptyStateCtaText,
  src,
  linkTo,
  pageHeading,
  btnVariant = BtnVariant.Primary,
}: BaseEmptyStateProps) => (
  <MainPageContainer heading={pageHeading}>
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
        <Link to={linkTo} className={`btn btn-${btnVariant}`}>
          {emptyStateCtaText}
        </Link>
      </div>
    </section>
  </MainPageContainer>
);

export default EmptyState;
