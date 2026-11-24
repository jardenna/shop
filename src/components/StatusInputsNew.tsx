import type { Status } from '../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../features/language/useLanguage';
import { useFormValidation } from '../hooks/useFormValidation';
import SelectboxNew from './selectbox/SelectboxNew';

interface StatusOptionsValues {
  label: string;
  value: Status;
}

const StatusInputsNew = () => {
  const { language } = useLanguage();

  const statusOptions: StatusOptionsValues[] = [
    {
      label: language.inactive,
      value: 'Inactive',
    },
    {
      label: language.scheduled,
      value: 'Scheduled',
    },
    {
      label: language.published,
      value: 'Published',
    },
  ];

  const initialState = {
    status: statusOptions[0],
  };

  const { values, onSelectChange } = useFormValidation({
    initialState,
  });

  return (
    <>
      <SelectboxNew
        name="status"
        labelText={language.category}
        options={statusOptions}
        value={values.status}
        onChange={onSelectChange}
        id="status"
        isSearchable
      />
      {values.status.value === 'Scheduled' && <div>h</div>}
    </>
  );
};

export default StatusInputsNew;
