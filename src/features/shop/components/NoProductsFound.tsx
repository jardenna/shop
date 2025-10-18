import Button from '../../../components/Button';

type NoProductsFound = {
  noProductText: string;
  openFilterPanel?: () => void;
  resetFilters: () => void;
};

const NoProductsFound = ({
  openFilterPanel,
  resetFilters,
  noProductText,
}: NoProductsFound) => (
  <div role="status" className="no-results">
    <p>{noProductText}</p>
    <div className="no-results-actions">
      <Button onClick={openFilterPanel}>Åbn filtrene</Button>
      <Button onClick={resetFilters}>Nulstil</Button>
    </div>
  </div>
);

export default NoProductsFound;
