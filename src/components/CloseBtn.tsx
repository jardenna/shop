import { useLanguage } from '../features/language/useLanguage';
import IconBtn from './IconBtn';

interface CloseBtnProps {
  ariaLabel?: string;
  size?: string;
  onClick: () => void;
}

const CloseBtn = ({ onClick, ariaLabel, size }: CloseBtnProps) => {
  const { language } = useLanguage();

  return (
    <IconBtn
      iconName="close"
      ariaLabel={ariaLabel ?? language.close}
      onClick={onClick}
      className="btn-close"
      size={size}
    />
  );
};

export default CloseBtn;
