import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import DatePicker from '../datePicker/DatePicker';
import FieldSet from '../fieldset/FieldSet';
import TimeInput from '../formElements/timeInput/TimeInput';
import Selectbox, { OptionType } from '../selectbox/Selectbox';

type StatusOptions = {
  label: string;
  value: CategoryStatus;
};

type SharedDatePickerProps = {
  categoryStatus: string;
  defaultStatusValue: StatusOptions;
  legendText: string;
  onSelectDate: any;
  selectedDate: Date;
  timeValue: any;
  onSelectStatus: (selectedOptions: OptionType) => void;
  onTimeChange: (event: ChangeInputType) => void;
};

const SharedDatePicker = ({
  categoryStatus,
  onSelectDate,
  legendText,
  selectedDate,
  timeValue,
  onTimeChange,
  onSelectStatus,
  defaultStatusValue,
}: SharedDatePickerProps) => {
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
    <FieldSet legendText={legendText}>
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
          <DatePicker
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            id="date"
            labelText={language.selectPublishDate}
          />
          <TimeInput
            value={timeValue}
            onChange={onTimeChange}
            id="time"
            labelText={language.selectPublishTime}
            name="time"
          />
        </>
      )}
    </FieldSet>
  );
};

export default SharedDatePicker;
