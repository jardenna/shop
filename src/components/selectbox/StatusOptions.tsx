import { OptionProps } from 'react-select';
import Badge from '../badge/Badge';
import CustomOption from './CustomOption';

type Colors = {
  label: string;
  status: string;
  value: string;
};

const StatusOptions = (props: OptionProps<Colors>) => (
  <CustomOption
    {...props}
    render={(data) => (
      <>
        <span>{data.label}</span>
        <Badge badgeText={data.status} className={data.status.toLowerCase()} />
      </>
    )}
  />
);
export default StatusOptions;
