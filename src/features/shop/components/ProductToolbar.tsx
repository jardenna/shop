import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import DisplayControls from '../../../components/DisplayControls';
import { FilterValuesType } from '../../../hooks/useFilterParams';
import { FilterKeys } from '../../../pages/CollectionPage';
import { FiltersCountResult, InputChangeHandler } from '../../../types/types';
import useLanguage from '../../language/useLanguage';
import FilterPanel from './FilterPanel';
import PaginationInfoText from './PaginationInfoText';

type ProductToolbar = {
  ariaDescribedby: string;
  availableBrands: string[];
  availableSizes: Size[];
  colors: string[];
  displayControlList: DisplayControls[];
  filtersCount: FiltersCountResult;
  infoText: string;
  isActive: string;
  onChange: InputChangeHandler;
  productCount: number;
  values: FilterValuesType<string>;
  onClearAllFilters: () => void;
  onClearSingleFilter: (filterKey: FilterKeys) => void;
  onRemoveFilterTag: (key: FilterKeys, value: string) => void;
  onSetDisplay: (id: string) => void;
};

const ProductToolbar = ({
  onClearSingleFilter,
  filtersCount,
  onChange,
  values,
  availableBrands,
  onClearAllFilters,
  displayControlList,
  productCount,
  availableSizes,
  onSetDisplay,
  isActive,
  colors,
  onRemoveFilterTag,
  ariaDescribedby,
  infoText,
}: ProductToolbar) => {
  const { language } = useLanguage();

  return (
    <section className="product-toolbar">
      <DisplayControls
        onSetDisplay={onSetDisplay}
        displayControlList={displayControlList}
        isActive={isActive}
        ariaLabel={language.productDisplay}
      />
      <PaginationInfoText
        infoText={infoText}
        ariaDescribedby={ariaDescribedby}
      />
      <FilterPanel
        onClearSingleFilter={onClearSingleFilter}
        filtersCount={filtersCount}
        onChange={onChange}
        values={values}
        availableBrands={availableBrands}
        availableSizes={availableSizes}
        colors={colors}
        language={language}
        onRemoveFilterTag={onRemoveFilterTag}
        onClearAllFilters={onClearAllFilters}
        productCount={productCount}
      />
    </section>
  );
};

export default ProductToolbar;
