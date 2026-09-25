import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

interface BtnCloseProps {
  ariaLabel?: string;
  size?: string;
  onClick: () => void;
}

const BtnClose = ({ onClick, ariaLabel, size }: BtnCloseProps) => {
  const { language } = useLanguage();

  return (
    <IconBtn
      iconName={IconName.Close}
      ariaLabel={ariaLabel ?? language.close}
      onClick={onClick}
      className="btn-close"
      size={size}
    />
  );
};

export default BtnClose;
