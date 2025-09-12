import { ReactNode } from 'react';
import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import type { AccordionList } from '../../../components/accordion/Accordion';
import Accordion from '../../../components/accordion/Accordion';
import Button from '../../../components/Button';
import CheckboxList from '../../../components/formElements/checkbox/CheckboxList';
import Icon from '../../../components/icons/Icon';
import TagList from '../../../components/tags/TagList';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import { FilterValuesType } from '../../../hooks/useFilterParams';
import LayoutElement from '../../../layout/LayoutElement';
import type { FilterKeys } from '../../../pages/CollectionPage';
import variables from '../../../scss/variables.module.scss';
import { BtnVariant, IconName } from '../../../types/enums';
import type {
  FiltersCountResult,
  InputChangeHandler,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import './filterPanel.styles.scss';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  list: string[];
  title: string;
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
  const x = countsByKey;

  const accordionConfig: AccordionConfigItem[] = [
    {
      key: 'colors',
      title: language.colours,
      list: colors,
      renderExtra: (checkbox: string) => (
        <span
          className="color-icons small-item"
          style={{
            backgroundColor: colorMap[checkbox],
            borderColor: checkbox === 'white' ? variables.colorIconBorder : '',
          }}
        />
      ),
    },
    { key: 'sizes', title: language.sizes, list: availableSizes },
    { key: 'brand', title: language.brand, list: availableBrands },
  ];

  // Type assertion for values access
  const accordionList: AccordionList[] = accordionConfig.map((item) => ({
    title: item.title,
    additionalTitle: x[item.key],
    content: (
      <div>
        <Button
          variant={BtnVariant.Default}
          onClick={() => {
            onClearSingleFilter(item.key);
          }}
        >
          Ryd {item.key}
        </Button>
        <CheckboxList
          checkBoxList={item.list}
          name={item.key}
          onChange={onChange}
          values={values[item.key]}
          language={language}
          renderExtra={item.renderExtra}
        />
      </div>
    ),
  }));

  return (
    <TogglePanel
      ariaControls="filter-products"
      showCloseIcon
      className="filter-panel"
      triggerBtnClassName="filter-btn"
      triggerBtnContent={
        <>
          {totalFiltersCount > 0 && `[${totalFiltersCount}]`} {language.filter}{' '}
          <Icon iconName={IconName.Filter} title={language.filter} />
        </>
      }
    >
      <section>
        <LayoutElement ariaLabel="filter">
          <h2>{language.filter}</h2>
        </LayoutElement>
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
        <Accordion accordionList={accordionList} />
        <LayoutElement as="footer" ariaLabel="filter" className="footer">
          <Button variant={BtnVariant.Secondary} onClick={onClearAllFilters}>
            Ryd
          </Button>
          <Button>Vis {productCount} varer</Button>
        </LayoutElement>
      </section>
    </TogglePanel>
  );
};

export default FilterPanel;
