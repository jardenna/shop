import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import Icon from '../../icons/Icon';
import VisuallyHidden from '../../VisuallyHidden';

interface PasswordPopupItemProps {
  isValid: boolean;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({ text, isValid }) => {
  const { language } = useLanguage();

  return (
    <li className={`popup-item ${!isValid ? 'error' : ''}`}>
      <Icon
        iconName={isValid ? IconName.Success : IconName.Error}
        title={isValid ? language.success : language.error}
        ariaHidden
      />
      <span>{text}</span>
      <VisuallyHidden>
        {isValid ? language.criterionMet : language.criterionNotMet}
      </VisuallyHidden>
    </li>
  );
};

export default PasswordPopupItem;
