import Button from '../../../components/Button';

type NoProductsFound = {
  noProductText: string;
  resetFilters: () => void;
};

const NoProductsFound = ({ resetFilters, noProductText }: NoProductsFound) => (
  <div role="status">
    <p>{noProductText}</p>
    <Button onClick={resetFilters}>Nulstil</Button>
  </div>
);

export default NoProductsFound;
