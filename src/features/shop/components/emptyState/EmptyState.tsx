import { Link } from 'react-router';
import Button from '../../../../components/Button';
import Picture from '../../../../components/Picture';
import MainPageContainer from '../../../../pages/pageContainer/MainPageContainer';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';

interface BaseEmptyStateProps {
  emptyStateCtaText: string;
  emptyStateText: string;
  emptyStateTitle: string;
  pageHeading: string;
  src: string;
  btnVariant?: BtnVariant;
}

interface LinkVariant {
  linkTo: string;
  onClick?: never;
}

interface ActionVariant {
  linkTo?: never;
  onClick: () => void;
}

type EmptyStateProps = BaseEmptyStateProps & (LinkVariant | ActionVariant);

const EmptyState = ({
  onClick,
  emptyStateText,
  emptyStateTitle,
  emptyStateCtaText,
  src,
  linkTo,
  pageHeading,
  btnVariant = BtnVariant.Primary,
}: EmptyStateProps) => (
  <MainPageContainer heading={pageHeading}>
    <section className="empty-state">
      <div>
        <Picture
          src={`${src}.png`}
          srcSet={`${src}.avif`}
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
        {linkTo ? (
          <Link to={linkTo} className={`btn btn-${btnVariant}`}>
            {emptyStateCtaText}
          </Link>
        ) : (
          <Button onClick={onClick}>{emptyStateCtaText}</Button>
        )}
      </div>
    </section>
  </MainPageContainer>
);

export default EmptyState;
