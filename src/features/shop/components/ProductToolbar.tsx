import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import DisplayControls from '../../../components/DisplayControls';
import type { FilterValuesType } from '../../../hooks/useFilterParams';
import type { FilterKeys } from '../../../pages/CollectionPage';
import type {
  FiltersCountResult,
  InputChangeHandler,
} from '../../../types/types';
import useLanguage from '../../language/useLanguage';
import FilterPanel from './FilterPanel';
import LiveAnnouncement from './LiveAnnouncement';

type ProductToolbar = {
  announce: boolean;
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
  onReset: () => void;
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
  infoText,
  announce,
  onReset,
  productsLoadedText,
}: ProductToolbar) => {
  const { language } = useLanguage();

  return (
    <section className="product-toolbar">
      <DisplayControls
        onSetDisplay={onSetDisplay}
        displayControlList={displayControlList}
        isActive={isActive}
      />
      <LiveAnnouncement
        infoText={infoText}
        announce={announce}
        ariaLiveText={`${productsLoadedText} ${infoText}`}
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
        onReset={onReset}
      />
    </section>
  );
};

export default ProductToolbar;
