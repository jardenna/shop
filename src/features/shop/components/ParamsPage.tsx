import { ReactNode, useId } from 'react';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Accordion, {
  AccordionList,
} from '../../../components/accordion/Accordion';
import ColorItem from '../../../components/ColorItem';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import DualRange from '../../../components/formElements/dualRangeSlider/DualRange';
import IconBtn from '../../../components/IconBtn';
import Icon from '../../../components/icons/Icon';
import TagList from '../../../components/tags/TagList';
import ToggleContent from '../../../components/ToggleContent';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../../components/togglePanel/useTogglePanel';
import { useSearchParamsState } from '../../../hooks/useSearchParamsState';
import { InitialFilters } from '../../../pages/AboutUsPage';
import { FilterKeys } from '../../../pages/CollectionPage';
import { BtnVariant, IconName } from '../../../types/enums';
import { sortSizesDynamic } from '../../../utils/sizeUtils';
import { getFilterSummary } from '../../../utils/utils';
import { useCurrency } from '../../currency/useCurrency';

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
  productCount: number;
  sizes: Size[];
}

const ParamsPage = ({
  initialFilters,
  sizes,
  brands,
  colors,
  language,
  productCount,
}: FilterProps) => {
  const ariaLabelledby = useId();
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
    { key: 'brand', label: language.brands, list: brands },
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
        <IconBtn
          variant={BtnVariant.Ghost}
          className="clear-filter-btn"
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
          ariaLabel={language.clearFilters}
          iconName={IconName.Trash}
          showLabel
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
          onCancel={onClearAllFilters}
          cancelBtnProps={{ btnLabel: language.clearAllFilters }}
        >
          <FieldSet legendText={language.filterProducts}>
            <FieldSet legendText="price">
              <IconBtn
                variant={BtnVariant.Ghost}
                className="clear-filter-btn"
                onClick={() => {
                  onClearSingleFilter(['minPrice', 'maxPrice']);
                }}
                ariaLabel={language.clearFilters}
                iconName={IconName.Trash}
                showLabel
              />
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
            </FieldSet>
            <Accordion accordionList={accordionList} name="filter" />
          </FieldSet>
        </Form>
      </section>
    </TogglePanel>
  );
};

export default ParamsPage;
