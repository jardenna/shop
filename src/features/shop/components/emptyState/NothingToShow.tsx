import Button from '../../../../components/Button';
import Img from '../../../../components/Img';

type NothingToShowProps = {
  noProductText: string;
  resetBtnText: string;
  resetFilters: () => void;
};

const NothingToShow = ({
  resetFilters,
  noProductText,
  resetBtnText,
}: NothingToShowProps) => (
  <section
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="nothing-to-show"
  >
    <Img src="/images/shopping_bag.png" alt="" />

    <div>
      <h2>Ingen produkter matcher dine filtre</h2>
      <p>{noProductText}</p>
      <Button onClick={resetFilters}>{resetBtnText}</Button>
    </div>
  </section>
);

export default NothingToShow;
