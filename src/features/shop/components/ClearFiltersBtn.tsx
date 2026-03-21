import IconBtn from '../../../components/IconBtn';
import { BtnVariant, IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

type ClearFiltersBtnProps = {
  disabled: boolean;
  onClick: () => void;
};

const ClearFiltersBtn = ({ onClick, disabled }: ClearFiltersBtnProps) => {
  const { language } = useLanguage();

  return (
    <IconBtn
      variant={BtnVariant.Ghost}
      className="clear-filter-btn"
      onClick={onClick}
      ariaLabel={language.clearFilters}
      iconName={IconName.Trash}
      showLabel
      disabled={disabled}
    />
  );
};

export default ClearFiltersBtn;
