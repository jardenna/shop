import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import DisplayControls from '../../../components/DisplayControls';
import { FilterValuesType } from '../../../hooks/useFilterParams';
import { FilterKeys } from '../../../pages/CollectionPage';
import { FiltersCountResult, InputChangeHandler } from '../../../types/types';
import useLanguage from '../../language/useLanguage';
import FilterPanel from './FilterPanel';
import PaginationInfoText from './PaginationInfoText';

type ProductToolbar = {
  announce: boolean;
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
  productsLoadedText: string;
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
  announce,
  productsLoadedText,
}: ProductToolbar) => {
  const { language } = useLanguage();

  return (
    <article className="product-toolbar">
      <DisplayControls
        onSetDisplay={onSetDisplay}
        displayControlList={displayControlList}
        isActive={isActive}
        ariaLabel={language.productDisplay}
      />
      <PaginationInfoText
        infoText={infoText}
        announce={announce}
        ariaDescribedby={ariaDescribedby}
        productsLoadedText={productsLoadedText}
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
    </article>
  );
};

export default ProductToolbar;
