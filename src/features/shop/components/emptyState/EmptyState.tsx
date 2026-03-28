import Button from '../../../../components/Button';
import Img from '../../../../components/Img';

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
    className="nothing-to-show"
  >
    <Img src="/images/shopping_bag.png" alt="" />

    <div>
      <h2>{noProductTitle}</h2>
      <p>{noProductText}</p>
      <Button onClick={onClearAllFilters}>{resetBtnText}</Button>
    </div>
  </section>
);

export default EmptyState;
