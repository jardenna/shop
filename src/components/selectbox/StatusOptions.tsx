import { OptionProps } from 'react-select';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CustomOption from './CustomOption';

type Status = {
  label: string;
  status: string;
  value: string;
};

const StatusOptions = (props: OptionProps<Status>) => {
  const { language } = useLanguage();

  return (
    <CustomOption
      {...props}
      render={(data) => (
        <>
          <span
            className={`option-icon status-option ${data.status.toLowerCase()}`}
          >
            {getlowerCaseFirstLetter(data.status, language).substring(0, 1)}
          </span>
          <span>{data.label}</span>
        </>
      )}
    />
  );
};

export default StatusOptions;
