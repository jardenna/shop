import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import Icon from '../../../components/icons/Icon';
import TogglePanel from '../../../components/togglePanel/TogglePanel';
import variables from '../../../scss/variables.module.scss';
import { IconName } from '../../../types/enums';
import { getColorOptions } from '../../../utils/colorUtils';
import useLanguage from '../../language/useLanguage';

type FilterPanelProps = {
  availableBrands: string[];
  availableSizes: Size[];
};
const FilterPanel = ({ availableBrands, availableSizes }: FilterPanelProps) => {
  const { language } = useLanguage();
  const sortedColorList = getColorOptions({
    language,
    borderColor: variables.colorIconBorder,
  });
  console.log(sortedColorList, availableBrands, availableSizes);

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
      Filterff
    </TogglePanel>
  );
};

export default FilterPanel;
