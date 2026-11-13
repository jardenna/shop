import { ReactNode } from 'react';
import { useLanguage } from '../features/language/useLanguage';
import { BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import Icon from './icons/Icon';

interface ClearFilterBtnProps {
  disabled: boolean;
  children?: ReactNode;
  showIcon?: boolean;
  variant?: BtnVariant;
  onClick: () => void;
}

const ClearFilterBtn = ({
  onClick,
  disabled,
  children,
  showIcon,
  variant = BtnVariant.Default,
}: ClearFilterBtnProps) => {
  const { language } = useLanguage();

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      className="clear-filter-btn"
    >
      {showIcon && <Icon iconName={IconName.ClearFilter} />}
      {language.clearFilters}
      {children && children}
    </Button>
  );
};

export default ClearFilterBtn;
