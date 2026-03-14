import { ReactNode } from 'react';
import { Size } from '../app/api/apiTypes/sharedApiTypes';
import Accordion, { AccordionList } from '../components/accordion/Accordion';
import Button from '../components/Button';
import ColorItem from '../components/ColorItem';
import FieldSet from '../components/fieldset/FieldSet';
import Form from '../components/form/Form';
import CheckboxList from '../components/formElements/checkbox/CheckboxList';
import DualRange from '../components/formElements/dualRangeSlider/DualRange';
import Icon from '../components/icons/Icon';
import TagList from '../components/tags/TagList';
import ToggleContent from '../components/ToggleContent';
import TogglePanel from '../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../components/togglePanel/useTogglePanel';
import VisuallyHidden from '../components/VisuallyHidden';
import { useCurrency } from '../features/currency/useCurrency';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { BtnVariant, IconName } from '../types/enums';
import { sortSizesDynamic } from '../utils/sizeUtils';
import { getFilterSummary } from '../utils/utils';
import { InitialFilters } from './AboutUsPage';
import { FilterKeys } from './CollectionPage';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  label: string;
  list: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

interface FilterProps {
  brands: string[];
  colors: string[];
  initialFilters: InitialFilters;
  language: Record<string, string>;
  sizes: Size[];
}

const ParamsPage = ({
  initialFilters,
  sizes,
  brands,
  colors,
  language,
}: FilterProps) => {
  const { currencyText } = useCurrency();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const {
    values,
    toggleValue,
    setValue,
    onRemoveFilterTag,
    onClearSingleFilter,
  } = useSearchParamsState(initialFilters);

  const filteredEntries = Object.entries(values).filter(
    (entry): entry is [string, string[]] => Array.isArray(entry[1]),
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
    { key: 'brand', label: language.brands, list: brands },
  ];

  const accordionList: AccordionList[] = accordionConfig.map((item) => ({
    title: language[item.key],
    additionalTitle: countsByKey[item.key] || '',
    content: (
      <FieldSet legendText={item.label}>
        <Button
          variant={BtnVariant.Ghost}
          className="clear-filter-btn"
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
        >
          {language.clearFilters}
        </Button>
        <CheckboxList
          checkBoxList={item.list}
          name={item.key}
          onChange={toggleValue}
          values={values[item.key]}
          language={language}
          renderExtra={item.renderExtra}
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
          <Icon iconName={IconName.Filter} />
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
        </>
      }
    >
      <section className="filter-panel-content">
        <ToggleContent btnVariant={BtnVariant.Default}>
          {filteredEntries.map(
            ([key, values]) =>
              values.length > 0 && (
                <TagList
                  key={key}
                  language={language}
                  values={values}
                  filterKey={key as FilterKeys}
                  onClick={onRemoveFilterTag}
                  ariaLabel={language.removeFilter}
                />
              ),
          )}
        </ToggleContent>
        <Form
          submitBtnLabel="Search"
          onSubmit={() => {
            console.log(values);
          }}
          onCancel={() => {
            console.log(values);
          }}
          cancelBtnProps={{ btnLabel: 'Clear' }}
        >
          <FieldSet legendText={language.filterProducts}>
            <Accordion accordionList={accordionList} name="filter" />
            <FieldSet legendText="price">
              <Button
                variant={BtnVariant.Ghost}
                className="clear-filter-btn"
                onClick={() => {
                  onClearSingleFilter(['minPrice', 'maxPrice']);
                }}
              >
                {language.clearFilters}
              </Button>
              <DualRange
                minValue={values.minPrice}
                maxValue={values.maxPrice}
                rangeLabel={language.priceRange}
                inputNames={{
                  min: 'minPrice',
                  max: 'maxPrice',
                }}
                inputLabels={{
                  min: 'Pris fra',
                  max: 'Pris til',
                }}
                onChange={setValue}
                unitLabel={currencyText}
              />
            </FieldSet>
          </FieldSet>
        </Form>
      </section>
    </TogglePanel>
  );
};

export default ParamsPage;
