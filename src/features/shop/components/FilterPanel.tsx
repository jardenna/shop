import { useId, type ReactNode } from 'react';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import type { AccordionList } from '../../../components/accordion/Accordion';
import Accordion from '../../../components/accordion/Accordion';
import Button from '../../../components/Button';
import ColorItem from '../../../components/ColorItem';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import Icon from '../../../components/icons/Icon';
import TagList from '../../../components/tags/TagList';
import ToggleContent from '../../../components/ToggleContent';
import { useTogglePanel } from '../../../components/togglePanel/useTogglePanel';
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

export type FilterPanelProps = {
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
  onReset: () => void;
};

const FilterPanel = ({
  availableSizes,
  availableBrands,
  colors,
  onChange,
  onReset,
  values,
  language,
  onRemoveFilterTag,
  onClearAllFilters,
  productCount,
  filtersCount,
  onClearSingleFilter,
}: FilterPanelProps) => {
  const ariaLabelledby = useId();
  const togglePanelId = useId();

  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const totalFiltersCount = filtersCount.totalCount;
  const countsByKey = filtersCount.countsByKey;
  const primaryBtnText =
    productCount > 0
      ? `${language.show} ${productCount} ${language.itemLabel}`
      : language.noItemsToShow;

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

  return (
    <>
      <Button
        className="filter-btn"
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={language.filtre}
        ariaHasPopup="dialog"
        ariaControls={togglePanelId}
      >
        <>
          {totalFiltersCount > 0 && `[${totalFiltersCount}]`} {language.filter}{' '}
          <Icon iconName={IconName.Filter} />
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
        </>
      </Button>
      <div
        ref={panelRef}
        role="dialog"
        className={`toggle-panel filter-panel ${isPanelShown ? 'shown' : ''}`}
        id={togglePanelId}
        aria-hidden={isPanelShown ? undefined : true}
      >
        <section
          className="filter-panel-content"
          aria-labelledby={ariaLabelledby}
        >
          <LayoutElement className="filter-panel-heading">
            <h2 id={ariaLabelledby}>{language.filterHeading}</h2>
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
          <Accordion
            accordionList={accordionList}
            onReset={onReset}
            name="filter"
          />
        </section>

        <footer className="footer">
          <Button variant={BtnVariant.Secondary} onClick={onClearAllFilters}>
            {language.clearAllFilters}
          </Button>
          <Button onClick={onHidePanel} disabled={productCount === 0}>
            {primaryBtnText}
          </Button>
        </footer>
      </div>
    </>
  );
};

export default FilterPanel;
