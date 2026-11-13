import IconBtn from '../../../components/IconBtn';
import { BtnVariant, IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface ClearFiltersBtnProps {
  disabled: boolean;
  variant?: BtnVariant;
  onClick: () => void;
}

const ClearFiltersBtn = ({
  onClick,
  disabled,
  variant = BtnVariant.Ghost,
}: ClearFiltersBtnProps) => {
  const { language } = useLanguage();

  return (
    <IconBtn
      onClick={onClick}
      ariaLabel={language.clearFilters}
      iconName={IconName.ClearFilter}
      showLabel
      disabled={disabled}
      variant={variant}
    />
  );
};

export default ClearFiltersBtn;
