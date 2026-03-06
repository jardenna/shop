import { ReactNode } from 'react';
import { Size } from '../app/api/apiTypes/sharedApiTypes';
import Accordion, { AccordionList } from '../components/accordion/Accordion';
import Button from '../components/Button';
import ColorItem from '../components/ColorItem';
import Form from '../components/form/Form';
import CheckboxList from '../components/formElements/checkbox/CheckboxList';
import DualRange from '../components/formElements/dualRangeSlider/DualRange';
import { useCurrency } from '../features/currency/useCurrency';
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { BtnVariant } from '../types/enums';
import { sortSizesDynamic } from '../utils/sizeUtils';
import { getFilterSummary } from '../utils/utils';
import { FilterKeys } from './CollectionPage';

type AccordionConfigItem<K extends FilterKeys = FilterKeys> = {
  key: K;
  list: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

interface FilterProps {
  availableBrands: string[];
  availableSizes: Size[];
  colors: string[];
  initialFilters: any;
  language: Record<string, string>;
}

const ParamsPage = ({
  initialFilters,
  availableSizes,
  availableBrands,
  colors,
  language,
}: FilterProps) => {
  const { currencyText } = useCurrency();

  const { values, toggleValue, setValue } =
    useSearchParamsState(initialFilters);

  const filtersCount = getFilterSummary(values);
  const countsByKey = filtersCount.countsByKey;

  const accordionConfig: AccordionConfigItem[] = [
    {
      key: 'colors',
      list: colors,
      renderExtra: (checkbox: string) => (
        <ColorItem colorKey={checkbox} hasBorderColor={checkbox === 'white'} />
      ),
    },
    { key: 'sizes', list: sortSizesDynamic(availableSizes) },
    { key: 'brand', list: availableBrands },
  ];

  const accordionList: AccordionList[] = accordionConfig.map((item) => ({
    title: language[item.key],
    additionalTitle: countsByKey[item.key] || '',
    content: (
      <>
        <Button variant={BtnVariant.Ghost} className="clear-filter-btn">
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
      </>
    ),
  }));

  return (
    <div>
      <Accordion accordionList={accordionList} />
      <Form
        submitBtnLabel="Search"
        onSubmit={() => {
          console.log(values);
        }}
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
            min: 'Pris fra',
            max: 'Pris til',
          }}
          onChange={setValue}
          unitLabel={currencyText}
        />
      </Form>
    </div>
  );
};

export default ParamsPage;
