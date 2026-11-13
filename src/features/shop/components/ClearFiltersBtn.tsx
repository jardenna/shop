import IconBtn from '../../../components/IconBtn';
import { IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface ClearFiltersBtnProps {
  disabled: boolean;
  onClick: () => void;
}

const ClearFiltersBtn = ({ onClick, disabled }: ClearFiltersBtnProps) => {
  const { language } = useLanguage();

  return (
    <IconBtn
      className="clear-filter-btn"
      onClick={onClick}
      ariaLabel={language.clearFilters}
      iconName={IconName.ClearFilter}
      showLabel
      disabled={disabled}
    />
  );
};

export default ClearFiltersBtn;
