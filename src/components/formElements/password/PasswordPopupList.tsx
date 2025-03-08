import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import ProgressBar from '../../progressbar/ProgressBar';
import PasswordPopupItem from './PasswordPopupItem';

export interface PasswordRulesProps {
  isValid: boolean;
  text: string;
}
interface PasswordPopupListProps {
  inputValue: string;
  passwordRules: (value: string) => PasswordRulesProps[];
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({
  passwordRules,
  inputValue,
}) => {
  const { language } = useLanguage();
  const passwordRulesList = passwordRules(inputValue);

  const validCount = passwordRulesList.filter((item) => item.isValid).length;
  const progressPercentage = (validCount / passwordRulesList.length) * 100;

  return (
    <div className="password-popup-container">
      <ul className="popup-list">
        {passwordRules(inputValue).map((rule) => (
          <PasswordPopupItem
            key={rule.text}
            isValid={rule.isValid}
            text={language[rule.text]}
          />
        ))}
      </ul>
      <ProgressBar progressPercentage={progressPercentage} />
    </div>
  );
};

export default PasswordPopupList;
