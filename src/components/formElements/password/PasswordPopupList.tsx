import useLanguage from '../../../features/language/useLanguage';
import ProgressBar from '../../progressbar/ProgressBar';
import PasswordPopupItem from './PasswordPopupItem';

export type PasswordRulesProps = {
  isValid: boolean;
  text: string;
};

type PasswordPopupListProps = {
  inputValue: string;
  passwordRules: (value: string) => PasswordRulesProps[];
};

const PasswordPopupList = ({
  passwordRules,
  inputValue,
}: PasswordPopupListProps) => {
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
