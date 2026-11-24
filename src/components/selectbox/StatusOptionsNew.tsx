import type { OptionProps } from 'react-select';
import { useLanguage } from '../../features/language/useLanguage';
import CustomOption from './CustomOption';
import type { CategoryProps } from './SelectField';

const StatusOptions = (props: OptionProps<CategoryProps>) => {
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
