import { isBefore } from 'date-fns';
import type { Status } from '../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../features/language/useLanguage';
import { useFormValidation } from '../hooks/useFormValidation';
import type { InputChangeHandler, RefElementType } from '../shared/types';
import { newDate, today } from '../utils/dates';
import DatePicker from './datePicker/DatePicker';
import TimeInput from './formElements/TimeInput';
import SelectboxNew from './selectbox/SelectboxNew';

interface StatusOptionsValues {
  label: string;
  value: Status;
}

export interface BaseStatusInputsProps {
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  timeValue: string;
  onSelectDate: (date: Date) => void;
}

interface StatusInputsProps extends BaseStatusInputsProps {
  max?: number;
  min?: number;
  ref?: RefElementType;
}

const StatusInputsNew = ({
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  min,
  max,
  ref,
}: StatusInputsProps) => {
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
        ref={ref}
      />
      {values.status.value === 'Scheduled' && (
        <>
          <TimeInput
            value={timeValue}
            onChange={onTimeChange}
            id="time"
            labelText={language.publishTime}
            name="time"
            min={min}
            max={max}
            required
          />
          <DatePicker
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            labelText={language.publishDate}
            disabled={(date: Date) => isBefore(date, today)}
            startMonth={newDate}
            captionLayout="label"
            required
          />
        </>
      )}
    </>
  );
};

export default StatusInputsNew;
