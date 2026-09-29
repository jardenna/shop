import Button from '../../../../components/Button';
import Picture from '../../../../components/Picture';
import './_empty-state.scss';

interface EmptyStateProps {
  emptyStateCtaText: string;
  emptyStateText: string;
  emptyStateTitle: string;
  src: string;

  onClick: () => void;
}

const EmptyStateNew = ({
  onClick,
  emptyStateText,
  emptyStateTitle,
  emptyStateCtaText,
  src,
}: EmptyStateProps) => (
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

      <Button onClick={onClick}>{emptyStateCtaText}</Button>
    </div>
  </section>
);

export default EmptyStateNew;
