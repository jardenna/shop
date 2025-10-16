import type { ReactNode } from 'react';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import type { AccordionList } from '../../../components/accordion/Accordion';
import Accordion from '../../../components/accordion/Accordion';
import Button from '../../../components/Button';
import ColorItem from '../../../components/ColorItem';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import Icon from '../../../components/icons/Icon';
import TagList from '../../../components/tags/TagList';
import ToggleContent from '../../../components/ToggleContent';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import VisuallyHidden from '../../../components/VisuallyHidden';
import { FilterValuesType } from '../../../hooks/useFilterParams';
import LayoutElement from '../../../layout/LayoutElement';
import type { FilterKeys } from '../../../pages/CollectionPage';
import { BtnVariant, IconName } from '../../../types/enums';
import type {
  FiltersCountResult,
  InputChangeHandler,
} from '../../../types/types';
import './filterPanel.styles.scss';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  list: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
  colors: string[];
  filtersCount: FiltersCountResult;
  language: Record<string, string>;
  onChange: InputChangeHandler;
  productCount: number;
  values: FilterValuesType<string>;
  onClearAllFilters: () => void;
  onClearSingleFilter: (filterKey: FilterKeys) => void;
  onRemoveFilterTag: (key: FilterKeys, value: string) => void;
};

const FilterPanel = ({
  availableSizes,
  availableBrands,
  colors,
  onChange,
  values,
  language,
  onRemoveFilterTag,
  onClearAllFilters,
  productCount,
  filtersCount,
  onClearSingleFilter,
}: FilterPanelProps) => {
  const totalFiltersCount = filtersCount.totalCount;
  const countsByKey = filtersCount.countsByKey;

  const accordionConfig: AccordionConfigItem[] = [
    {
      key: 'colors',
      list: colors,
      renderExtra: (checkbox: string) => (
        <ColorItem colorKey={checkbox} hasBorderColor={checkbox === 'white'} />
      ),
    },
    { key: 'sizes', list: availableSizes },
    { key: 'brand', list: availableBrands },
  ];

  const accordionList: AccordionList[] = accordionConfig.map((item) => ({
    title: language[item.key],
    additionalTitle: countsByKey[item.key] > 0 ? countsByKey[item.key] : '',
    content: (
      <>
        <Button
          variant={BtnVariant.Ghost}
          className="clear-filter-btn"
          disabled={countsByKey[item.key] === 0}
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
        >
          {language.clearFilters}
        </Button>
        <CheckboxList
          checkBoxList={item.list}
          name={item.key}
          onChange={onChange}
          values={values[item.key]}
          language={language}
          renderExtra={item.renderExtra}
        />
      </>
    ),
  }));

  const ariaLabelledby = 'filter-title';

  return (
    <TogglePanel
      ariaHasPopup="dialog"
      footer={{
        primaryBtnText: `${language.show} ${productCount} ${language.itemLabel}`,
        secondaryAction: onClearAllFilters,
        secondaryBtnText: language.clearAllFilters,
      }}
      ariaControls="filter-products"
      role="dialog"
      showCloseIcon
      className="filter-panel"
      triggerBtnClassName="filter-btn"
      triggerBtnContent={
        <>
          {totalFiltersCount > 0 && `[${totalFiltersCount}]`} {language.filter}{' '}
          <Icon iconName={IconName.Filter} />
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
        </>
      }
    >
      <section
        className="filter-panel-content"
        aria-labelledby={ariaLabelledby}
      >
        <LayoutElement>
          <h2 id={ariaLabelledby}>{language.filter}</h2>
        </LayoutElement>

        <ToggleContent btnVariant={BtnVariant.Default}>
          {Object.entries(values).map(
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

        <Accordion accordionList={accordionList} />
      </section>
    </TogglePanel>
  );
};

export default FilterPanel;
