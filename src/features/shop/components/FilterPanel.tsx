import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Checkbox from '../../../components/formElements/checkbox/Checkbox';
import Icon from '../../../components/icons/Icon';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import { FilterValuesType } from '../../../hooks/userFilterParams';
import { IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
  values: FilterValuesType;
  onChange: (event: ChangeInputType) => void;
};
const FilterPanel = ({
  availableSizes,
  availableBrands,
  onChange,
  values,
}: FilterPanelProps) => {
  const { language } = useLanguage();
  // const sortedColorList = getColorOptions({
  //   language,
  //   borderColor: variables.colorIconBorder,
  // });

  return (
    <TogglePanel
      ariaControls="filter-products"
      triggerBtnClassName="product-filter"
      showCloseIcon
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
