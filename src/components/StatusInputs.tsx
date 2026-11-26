import { isBefore } from 'date-fns';
import type { Status } from '../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../features/language/useLanguage';
import type { InputChangeHandler, RefElementType } from '../shared/types';
import { newDate, today } from '../utils/dates';
import DatePicker from './datePicker/DatePicker';
import TimeInput from './formElements/TimeInput';
import SelectboxNew, {
  type SelectChangeHandler,
} from './selectbox/SelectboxNew';
import type { StatusOptionsValues } from './SharedCategoryInputs';

export interface BaseStatusInputsProps {
  id: string;
  labelText: string;
  name: string;
  onSelectStatus: SelectChangeHandler<StatusOptionsValues>;
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  timeValue: string;
  value: Status;
  onSelectDate: (date: Date) => void;
}

interface StatusInputsProps extends BaseStatusInputsProps {
  max?: number;
  min?: number;
  ref?: RefElementType;
}

const StatusInputs = ({
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  labelText,
  min,
  max,
  ref,
  value,
  id,
  name,
  onSelectStatus,
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

  return (
    <>
      <SelectboxNew
        id={id}
        options={statusOptions}
        onChange={onSelectStatus}
        name={name}
        labelText={labelText}
        value={value}
        ref={ref}
        required
      />

      {value === 'Scheduled' && (
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

export default StatusInputs;
