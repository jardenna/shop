import { FC } from 'react';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import Icon, { IconName } from './icons/Icon';

interface BtnCloseProps {
  ariaLabel?: string;
  autoFocus?: boolean;
  onClick: () => void;
}

const BtnClose: FC<BtnCloseProps> = ({
  onClick,
  ariaLabel = 'Close',
  autoFocus,
}) => {
  const { language } = useLanguage();

  return (
    <Button
      variant={BtnVariant.Ghost}
      onClick={onClick}
      ariaLabel={ariaLabel || language.close}
      autoFocus={autoFocus}
      className="btn-close"
    >
      <Icon iconName={IconName.Close} title={language.close} />
    </Button>
  );
};

export default BtnClose;
