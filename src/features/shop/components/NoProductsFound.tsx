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
  <div role="status">
    <p>{noProductText}</p>
    <Button onClick={resetFilters}>{resetBtnText}</Button>
  </div>
);

export default NoProductsFound;
