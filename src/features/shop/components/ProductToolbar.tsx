import DisplayControls, {
  DisplayControlsProps,
} from '../../../components/DisplayControls';
import LiveAnnouncement, {
  LiveAnnouncementProps,
} from '../../../components/LiveAnnouncement';
import FilterPanel, { FilterPanelProps } from './FilterPanel';

type ProductToolbarProps = FilterPanelProps &
  DisplayControlsProps &
  LiveAnnouncementProps & {
    language: Record<string, string>;
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
  ariaLiveText,
  language,
}: ProductToolbarProps) => (
  <section className="product-toolbar">
    <DisplayControls
      onSetDisplay={onSetDisplay}
      displayControlList={displayControlList}
      isActive={isActive}
    />
    <LiveAnnouncement
      infoText={infoText}
      announce={announce}
      ariaLiveText={ariaLiveText}
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

export default ProductToolbar;
