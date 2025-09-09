import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import type { AccordionList } from '../../../components/accordion/Accordion';
import Accordion from '../../../components/accordion/Accordion';
import Button from '../../../components/Button';
import Checkbox from '../../../components/formElements/checkbox/Checkbox';
import IconContent from '../../../components/IconContent';
import Icon from '../../../components/icons/Icon';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import { FilterValuesType } from '../../../hooks/useFilterParams';
import variables from '../../../scss/variables.module.scss';
import { BtnVariant, IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
  colors: string[];
  language: Record<string, string>;
  values: FilterValuesType;
  onChange: (event: ChangeInputType) => void;
};
const FilterPanel = ({
  availableSizes,
  availableBrands,
  colors,
  onChange,
  values,
  language,
}: FilterPanelProps) => {
  const accordionList: AccordionList[] = [
    {
      title: language.colours,
      content: (
        <Checkbox
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
        <Checkbox
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
        <Checkbox
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
      <article>
        <h2>{language.filter}</h2>
        <div>
          {Object.entries(values).map(([key, values]) => (
            <div key={key}>
              <ul>
                {values.map((value) => (
                  <li key={value}>
                    <Button variant={BtnVariant.WidthIcon} key={value}>
                      {value}
                      <IconContent
                        iconName={IconName.Close}
                        title=""
                        size="16"
                        ariaLabel={language.removeFilter}
                      />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Accordion accordionList={accordionList} />
      </article>
    </TogglePanel>
  );
};

export default FilterPanel;
