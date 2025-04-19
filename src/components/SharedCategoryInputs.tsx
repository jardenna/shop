import { CategoryStatus } from '../app/api/apiTypes';
import useLanguage from '../features/language/useLanguage';
import { ChangeInputType } from '../types/types';
import DatePicker from './datePicker/DatePicker';
import Input from './formElements/Input';
import TimeInput from './formElements/timeInput/TimeInput';
import Selectbox, { OptionType } from './selectbox/Selectbox';

type StatusOptions = {
  label: string;
  value: CategoryStatus;
};

type SharedCategoryInputsProps = {
  categoryNameErrorText: string;
  categoryNameId: string;
  categoryNameLabelText: string;
  categoryNamePlaceholder: string;
  categoryNamevalue: string;
  categoryStatus: string;
  defaultStatusValue: StatusOptions;
  selectedDate: Date;
  timeValue: string;
  onCategoryNameChange: (event: ChangeInputType) => void;
  onSelectDate: (date: Date) => void;
  onSelectStatus: (selectedOptions: OptionType) => void;
  onTimeChange: (event: ChangeInputType) => void;
};

const SharedCategoryInputs = ({
  categoryStatus,
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  onSelectStatus,
  defaultStatusValue,
  onCategoryNameChange,
  categoryNamevalue,
  categoryNameId,
  categoryNamePlaceholder,
  categoryNameLabelText,
  categoryNameErrorText,
}: SharedCategoryInputsProps) => {
  const { language } = useLanguage();
  const statusOptions: StatusOptions[] = [
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

  return (
    <>
      <Input
        onChange={onCategoryNameChange}
        value={categoryNamevalue}
        id={categoryNameId}
        name={categoryNameId}
        labelText={categoryNameLabelText}
        placeholder={categoryNamePlaceholder}
        errorText={categoryNameErrorText}
        required
      />

      <Selectbox
        id="categoryStatus"
        defaultValue={defaultStatusValue}
        options={statusOptions}
        onChange={onSelectStatus}
        name="categoryStatus"
        labelText={language.selectCategoryStatus}
      />
      {categoryStatus === 'Scheduled' && (
        <>
          <TimeInput
            value={timeValue}
            onChange={onTimeChange}
            id="time"
            labelText={language.selectPublishTime}
            name="time"
          />
          <DatePicker
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            labelText={language.selectPublishDate}
          />
        </>
      )}
    </>
  );
};

export default SharedCategoryInputs;
