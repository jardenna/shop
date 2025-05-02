import { OptionProps } from 'react-select';
import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
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
          <span>{data.label}</span>
          <Badge
            badgeText={language[data.status.toLowerCase()]}
            className={data.status.toLowerCase()}
          />
        </>
      )}
    />
  );
};
export default StatusOptions;
