import { OptionProps } from 'react-select';
import useLanguage from '../../features/language/useLanguage';
import CustomOption from './CustomOption';

type Colors = {
  label: string;
  status: string;
  value: string;
};

const StatusOptions = (props: OptionProps<Colors>) => {
  const { language } = useLanguage();

  return (
    <CustomOption
      {...props}
      render={(data) => (
        <>
          <span
            className={`option-icon status-option ${data.status.toLowerCase()}`}
          >
            {language[data.status.toLowerCase()].substring(0, 1)}
          </span>
          <span>{data.label}</span>
        </>
      )}
    />
  );
};

export default StatusOptions;
