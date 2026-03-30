import { Link } from 'react-router';
import Button from '../../../../components/Button';
import Picture from '../../../../components/Picture';
import { BtnVariant } from '../../../../types/enums';
import './_empty-state.scss';

interface BaseEmptyStateProps {
  emtyStateCtaText: string;
  noProductText: string;
  noProductTitle: string;
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
  noProductText,
  noProductTitle,
  emtyStateCtaText,
  src,
  linkTo,
  btnVariant = BtnVariant.Primary,
}: EmptyStateProps) => (
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
      <h2 className="empty-space-heading">{noProductTitle}</h2>
      <p role="status" aria-atomic="true">
        {noProductText}.
      </p>
      {linkTo ? (
        <Link to={linkTo} className={`btn btn-${btnVariant}`}>
          {emtyStateCtaText}
        </Link>
      ) : (
        <Button onClick={onClick}>{emtyStateCtaText}</Button>
      )}
    </div>
  </section>
);

export default EmptyState;
