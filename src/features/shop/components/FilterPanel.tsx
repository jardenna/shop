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
import type { InputChangeHandler } from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import './filterPanel.styles.scss';

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
  colors: string[];
  language: Record<string, string>;
  onChange: InputChangeHandler;
  productCount: number;
  values: FilterValuesType<string>;
  onClearAllFilters: () => void;
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
}: FilterPanelProps) => {
  const accordionList: AccordionList[] = [
    {
      title: language.colours,
      content: (
        <CheckboxList
          checkBoxList={colors}
          name="colors"
          onChange={onChange}
          values={values.colors}
          language={language}
          renderExtra={(checkbox) => (
            <span
              className="color-icons small-item"
              style={{
                backgroundColor: colorMap[checkbox],
                borderColor:
                  checkbox === 'white' ? variables.colorIconBorder : '',
              }}
            />
          )}
        />
      ),
    },
    {
      title: language.sizes,
      content: (
        <CheckboxList
          checkBoxList={availableSizes}
          name="sizes"
          onChange={onChange}
          values={values.sizes}
        />
      ),
    },
    {
      title: language.brand,
      content: (
        <CheckboxList
          checkBoxList={availableBrands}
          name="brand"
          onChange={onChange}
          values={values.brand}
        />
      ),
    },
  ];

  return (
    <TogglePanel
      ariaControls="filter-products"
      triggerBtnClassName="product-filter"
      showCloseIcon
      className="filter-panel"
      triggerBtnContent={
        <>
          <span>{language.filter}</span>
          <Icon iconName={IconName.Filter} title={language.filter} />
        </>
      }
    >
      <section>
        <LayoutElement as="header" ariaLabel="filter">
          <h2>{language.filter}</h2>
        </LayoutElement>
        {Object.entries(values).map(
          ([key, values]) =>
            values.length > 0 && (
              <TagList
                language={language}
                key={key}
                values={values}
                filterKey={key}
                onClick={onRemoveFilterTag}
                ariaLabel={language.removeFilter}
              />
            ),
        )}
        <Accordion accordionList={accordionList} />
        <LayoutElement ariaLabel="filter" className="footer">
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
