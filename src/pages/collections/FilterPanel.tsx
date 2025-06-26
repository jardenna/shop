import Icon from '../../components/icons/Icon';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';

const FilterPanel = () => {
  const { language } = useLanguage();

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
      Filter
    </TogglePanel>
  );
};

export default FilterPanel;
