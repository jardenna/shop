import Button from '../../../components/Button';

type NoProductsFound = {
  noProductText: string;
  resetBtnText: string;
  resetFilters: () => void;
};

const NoProductsFound = ({
  resetFilters,
  noProductText,
  resetBtnText,
}: NoProductsFound) => (
  <div role="status" aria-live="polite" aria-atomic="true">
    <p>{noProductText}</p>
    <Button onClick={resetFilters}>{resetBtnText}</Button>
  </div>
);

export default NoProductsFound;
