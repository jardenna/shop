import Button from '../../../../components/Button';
import Picture from '../../../../components/Picture';
import './_empty-state.scss';

type EmptyStateProps = {
  noProductText: string;
  noProductTitle: string;
  src: string;
  resetBtnText?: string;
  onClearAllFilters?: () => void;
};

const EmptyState = ({
  onClearAllFilters,
  noProductText,
  noProductTitle,
  resetBtnText,
  src,
}: EmptyStateProps) => (
  <section
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="empty-state"
  >
    <div>
      <Picture
        src={`${src}.png`}
        srcSet={`${src}.avif`}
        alt=""
        ratio="16:9"
        priority
        className="empty-state-img"
      />
    </div>
    <div className="empty-state-info">
      <h2 className="empty-space-heading">{noProductTitle}</h2>
      <p>{noProductText}</p>
      {resetBtnText && (
        <Button onClick={onClearAllFilters}>{resetBtnText}</Button>
      )}
    </div>
  </section>
);

export default EmptyState;
