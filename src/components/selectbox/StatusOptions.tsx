import { OptionProps } from 'react-select';
import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import CustomOption from './CustomOption';

type StatusProps = {
  label: string;
  status: Status;
  value: string;
};

const StatusOptions = (props: OptionProps<StatusProps>) => {
  const { language } = useLanguage();

  return (
    <CustomOption
      {...props}
      render={(data) => (
        <>
          <span>{data.label}</span>{' '}
          <span className="text-italic">
            {data.status !== 'Published' && `(${language.notPublished})`}
          </span>
        </>
      )}
    />
  );
};

export default StatusOptions;
