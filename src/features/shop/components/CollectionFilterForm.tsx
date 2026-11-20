import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import type { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Accordion, {
  type AccordionList,
} from '../../../components/accordion/Accordion';
import ColorItem from '../../../components/ColorItem';
import FieldSet from '../../../components/fieldset/FieldSet';
import FilterPanelFooter from '../../../components/filterPanel/FilterPanelFooter';
import Form from '../../../components/Form';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import DualRange from '../../../components/formElements/dualRangeSlider/DualRange';
import TagList from '../../../components/tags/TagList';
import type {
  FilterKeys,
  InitialFilters,
} from '../../../pages/shopProductPages/CollectionPage';
import type { InputChangeHandler, Language } from '../../../types/types';
import { sortSizesDynamic } from '../../../utils/sizeUtils';
import { getFilterSummary } from '../../../utils/utils';
import { useCurrency } from '../../currency/useCurrency';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  label: string;
  list: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

interface CollectionFilterFormProps {
  brands: string[];
  colors: string[];
  initialFilters: InitialFilters;
  language: Language;
  productCount: number;
  setValue: InputChangeHandler;
  sizes: Size[];
  toggleValue: InputChangeHandler;
  values: InitialFilters;
  onClearAllFilters: () => void;
  onClearSingleFilter: (keys: string | string[]) => void;
  onHidePanel: () => void;
  onRemoveFilterTag: (key: string, value: string) => void;
}

const CollectionFilterForm = ({
  initialFilters,
  sizes,
  brands,
  colors,
  language,
  onHidePanel,
  productCount,
  values,
  toggleValue,
  setValue,
  onRemoveFilterTag,
  onClearSingleFilter,
  onClearAllFilters,
}: CollectionFilterFormProps) => {
  const [searchParams] = useSearchParams();
  const { currencyText } = useCurrency();

  const primaryBtnText =
    productCount > 0
      ? `${language.show} ${productCount} ${productCount === 1 ? language.item : language.items}`
      : language.noItemsToShow;

  const hasActiveFilters = Object.keys(initialFilters).some((key) =>
    searchParams.has(key),
  );

  const isClearFiltersDisabled = !hasActiveFilters;

  const isClearPriceBtnDisabled =
    values.minPrice.trim() === '' && values.maxPrice.trim() === '';

  const filteredEntries = Object.entries(values).filter(
    (entry): entry is [string, string[]] =>
      Array.isArray(entry[1]) && entry[1].length > 0,
  );

  const filtersCount = getFilterSummary(values);
  const countsByKey = filtersCount.countsByKey;

  const accordionConfig: AccordionConfigItem[] = [
    {
      key: 'colors',
      label: language.colors,
      list: colors,
      renderExtra: (checkbox: string) => (
        <ColorItem colorKey={checkbox} hasBorderColor={checkbox === 'white'} />
      ),
    },
    { key: 'sizes', label: language.sizes, list: sortSizesDynamic(sizes) },
    { key: 'brand', label: language.brand, list: brands },
  ];

  const accordionList: AccordionList[] = accordionConfig.map((item) => ({
    title: language[item.key],
    additionalTitle: countsByKey[item.key] || '',
    content: (
      <FieldSet legendText={item.label}>
        <CheckboxList
          checkBoxList={item.list}
          name={item.key}
          onChange={toggleValue}
          values={values[item.key]}
          language={language}
          renderExtra={item.renderExtra}
        />
        <FilterPanelFooter
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
          disabled={countsByKey[item.key] === 0}
        />
      </FieldSet>
    ),
  }));

  return (
    <Form
      className="filter-form"
      submitBtnLabel={primaryBtnText}
      onSubmit={onHidePanel}
      cancelBtnProps={{
        btnLabel: language.clearAllFilters,
        isDisabled: isClearFiltersDisabled,
        onCancel: onClearAllFilters,
      }}
    >
      <FieldSet
        legendText={language.filterProducts}
        className="filter-fieldset"
      >
        {filteredEntries.length > 0 && (
          <div>
            {filteredEntries.map(([key, values]) => (
              <TagList
                key={key}
                language={language}
                tagList={values.map((value) => ({
                  key,
                  value,
                }))}
                onClick={onRemoveFilterTag}
              />
            ))}
          </div>
        )}
        <FieldSet
          legendText={language.priceRange}
          className="dural-range-fieldset"
          showLegendText
        >
          <DualRange
            minValue={values.minPrice}
            maxValue={values.maxPrice}
            inputNames={{
              min: 'minPrice',
              max: 'maxPrice',
            }}
            inputLabels={{
              min: language.priceFrom,
              max: language.priceTo,
            }}
            onChange={setValue}
            unitLabel={currencyText}
          />
          <FilterPanelFooter
            onClick={() => {
              onClearSingleFilter(['minPrice', 'maxPrice']);
            }}
            disabled={isClearPriceBtnDisabled}
          />
        </FieldSet>
        <Accordion accordionList={accordionList} name="filter" />
      </FieldSet>
    </Form>
  );
};

export default CollectionFilterForm;
