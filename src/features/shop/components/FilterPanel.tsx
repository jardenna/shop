import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Checkbox from '../../../components/formElements/checkbox/Checkbox';
import Icon from '../../../components/icons/Icon';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import useFormValidation from '../../../hooks/useFormValidation';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
};
const FilterPanel = ({ availableSizes, availableBrands }: FilterPanelProps) => {
  const { language } = useLanguage();
  // const sortedColorList = getColorOptions({
  //   language,
  //   borderColor: variables.colorIconBorder,
  // });

  const initialState = {
    sizes: [],
    brand: [],
  };
  const { onChange, values } = useFormValidation({ initialState });
  console.log(values);

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
      <Checkbox
        checkBoxList={availableSizes}
        name="sizes"
        onChange={onChange}
        values={values.sizes}
      />
      <Checkbox
        checkBoxList={availableBrands}
        name="brand"
        onChange={onChange}
        values={values.brand}
      />
    </TogglePanel>
  );
};

export default FilterPanel;
