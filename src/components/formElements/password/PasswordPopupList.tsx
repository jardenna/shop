import useLanguage from '../../../features/language/useLanguage';
import passwordRules from '../../../utils/passwordRules';
import ProgressBar from '../../progressbar/ProgressBar';
import PasswordPopupItem from './PasswordPopupItem';

type PasswordPopupListProps = {
  value: string;
};

const PasswordPopupList = ({ value }: PasswordPopupListProps) => {
  const { language } = useLanguage();
  const passwordRulesList = passwordRules(value);
  const validCount = passwordRulesList.filter((item) => item.isValid).length;
  const progressPercentage = (validCount / passwordRulesList.length) * 100;

  const showPopup = passwordRulesList.every((item) => item.isValid);

  return (
    !showPopup && (
      <div className="password-popup-container">
        <ul className="popup-list">
          {passwordRules(value).map((rule) => (
            <PasswordPopupItem
              key={rule.text}
              isValid={rule.isValid}
              text={language[rule.text]}
            />
          ))}
        </ul>
        <ProgressBar progressPercentage={progressPercentage} />
      </div>
    )
  );
};

export default PasswordPopupList;
