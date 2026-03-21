import { ReactNode, useId } from 'react';
import { useSearchParams } from 'react-router';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Accordion, {
  AccordionList,
} from '../../../components/accordion/Accordion';
import ColorItem from '../../../components/ColorItem';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import DualRange from '../../../components/formElements/dualRangeSlider/DualRange';
import Icon from '../../../components/icons/Icon';
import TagList from '../../../components/tags/TagList';
import ToggleContent from '../../../components/ToggleContent';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../../components/togglePanel/useTogglePanel';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { FilterKeys } from '../../../pages/CollectionPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { sortSizesDynamic } from '../../../utils/sizeUtils';
import { getFilterSummary } from '../../../utils/utils';
import { useCurrency } from '../../currency/useCurrency';
import ClearFiltersBtn from './ClearFiltersBtn';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  label: string;
  list: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

export interface InitialFilters {
  brand: string[];
  colors: string[];
  maxPrice: string;
  minPrice: string;
  sizes: string[];
  [paramKey: string]: string | string[];
}

interface FilterProps {
  brands: string[];
  colors: string[];
  initialFilters: InitialFilters;
  language: Record<string, string>;
  productCount: number;
  sizes: Size[];
  onReset: () => void;
}

const ParamsPage = ({
  initialFilters,
  sizes,
  brands,
  colors,
  language,
  productCount,
  onReset,
}: FilterProps) => {
  const ariaLabelledby = useId();
  const [searchParams] = useSearchParams();
  const { currencyText } = useCurrency();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const primaryBtnText =
    productCount > 0
      ? `${language.show} ${productCount} ${language.itemLabel}`
      : language.noItemsToShow;

  const {
    values,
    toggleValue,
    setValue,
    onRemoveFilterTag,
    onClearSingleFilter,
    onClearAllFilters,
  } = useSearchParamsState(initialFilters);

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
        <ClearFiltersBtn
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
          disabled={countsByKey[item.key] === 0}
        />
      </FieldSet>
    ),
  }));

  return (
    <TogglePanel
      onTogglePanel={onTogglePanel}
      onHidePanel={onHidePanel}
      isPanelShown={isPanelShown}
      panelRef={panelRef}
      className="filter-panel"
      triggerBtnContent={
        <>
          {language.filter} <Icon iconName={IconName.Filter} />
        </>
      }
    >
      <section aria-labelledby={ariaLabelledby} className="params">
        <header className="filter-panel-heading">
          <h2 id={ariaLabelledby}>{language.filterHeading}</h2>
        </header>
        {filteredEntries.length > 0 && (
          <ToggleContent btnVariant={BtnVariant.Default}>
            {filteredEntries.map(([key, values]) => (
              <TagList
                key={key}
                language={language}
                values={values}
                filterKey={key as FilterKeys}
                onClick={onRemoveFilterTag}
                ariaLabel={language.removeFilter}
              />
            ))}
          </ToggleContent>
        )}
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
          <FieldSet legendText={language.filterProducts}>
            <FieldSet
              legendText={language.priceRange}
              className="dural-range-fieldset"
            >
              <DualRange
                minValue={values.minPrice}
                maxValue={values.maxPrice}
                rangeLabel={language.priceRange}
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
              <ClearFiltersBtn
                onClick={() => {
                  onClearSingleFilter(['minPrice', 'maxPrice']);
                }}
                disabled={isClearPriceBtnDisabled}
              />
            </FieldSet>
            <Accordion
              accordionList={accordionList}
              name="filter"
              onReset={onReset}
            />
          </FieldSet>
        </Form>
      </section>
    </TogglePanel>
  );
};

export default ParamsPage;
