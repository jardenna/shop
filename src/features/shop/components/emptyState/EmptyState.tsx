import Button from '../../../../components/Button';
import Img from '../../../../components/Img';
import './_empty-state.scss';

type EmptyStateProps = {
  noProductText: string;
  noProductTitle: string;
  resetBtnText: string;
  onClearAllFilters: () => void;
};

const EmptyState = ({
  onClearAllFilters,
  noProductText,
  noProductTitle,
  resetBtnText,
}: EmptyStateProps) => (
  <section
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="empty-state"
  >
    <div>
      <Img src="/images/shopping_bag.png" alt="" className="empty-state-img" />
    </div>
    <div className="empty-state-info">
      <h2 className="empty-space-heading">{noProductTitle}</h2>
      <p>{noProductText}</p>
      <Button onClick={onClearAllFilters}>{resetBtnText}</Button>
    </div>
  </section>
);

export default EmptyState;
