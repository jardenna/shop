import { useLanguage } from '../features/language/useLanguage';
import { BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import Icon from './icons/Icon';

type BtnCloseProps = {
  ariaLabel?: string;
  autoFocus?: boolean;
  size?: string;
  onClick: () => void;
};

const BtnClose = ({
  onClick,
  ariaLabel = 'Close',
  autoFocus,
  size,
}: BtnCloseProps) => {
  const { language } = useLanguage();

  return (
    <Button
      variant={BtnVariant.Ghost}
      onClick={onClick}
      ariaLabel={ariaLabel || language.close}
      autoFocus={autoFocus}
      className="btn-close"
    >
      <Icon iconName={IconName.Close} size={size} />
    </Button>
  );
};

export default BtnClose;
