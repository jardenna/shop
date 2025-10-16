import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import Icon from '../../icons/Icon';
import VisuallyHidden from '../../VisuallyHidden';

type PasswordPopupItemProps = {
  isValid: boolean;
  text: string;
};

const PasswordPopupItem = ({ text, isValid }: PasswordPopupItemProps) => {
  const { language } = useLanguage();

  return (
    <li className={`popup-item ${!isValid ? 'error' : ''}`}>
      <Icon iconName={isValid ? IconName.Success : IconName.Error} />
      <span>{text}</span>
      <VisuallyHidden>
        {isValid ? language.criterionMet : language.criterionNotMet}
      </VisuallyHidden>
    </li>
  );
};

export default PasswordPopupItem;
