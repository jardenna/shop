import type { ReactElement } from 'react';
import { useLanguage } from '../features/language/useLanguage';
import { BtnVariant, type BtnVariantValue } from '../types/enums';
import Button from './Button';
import Icon from './icons/Icon';

interface ClearFilterBtnProps {
  disabled: boolean;
  children?: ReactElement;
  showIcon?: boolean;
  variant?: BtnVariantValue;
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
      {showIcon && <Icon iconName="clearFilter" />}
      {language.clearFilters}
      {children && children}
    </Button>
  );
};

export default ClearFilterBtn;
