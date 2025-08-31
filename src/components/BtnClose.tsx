import useLanguage from '../features/language/useLanguage';
import { BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import Icon from './icons/Icon';

type BtnCloseProps = {
  ariaLabel?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  onClick: () => void;
};

const BtnClose = ({
  onClick,
  ariaLabel = 'Close',
  autoFocus,
  tabIndex,
}: BtnCloseProps) => {
  const { language } = useLanguage();

  return (
    <Button
      variant={BtnVariant.Ghost}
      onClick={onClick}
      ariaLabel={ariaLabel || language.close}
      autoFocus={autoFocus}
      className="btn-close"
      tabIndex={tabIndex === 0 || tabIndex === -1 ? tabIndex : undefined}
    >
      <Icon iconName={IconName.Close} title={language.close} />
    </Button>
  );
};

export default BtnClose;
