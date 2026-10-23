import { isBefore, startOfDay } from 'date-fns';
import { Status } from '../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../features/language/useLanguage';
import type {
  InputChangeHandler,
  OptionType,
  RefElementType,
} from '../types/types';
import DatePicker from './datePicker/DatePicker';
import TimeInput from './formElements/timeInput/TimeInput';
import Selectbox from './selectbox/Selectbox';

interface StatusOptionsValues {
  id: string;
  label: string;
  value: Status;
}

export type StatusInputsProps = {
  defaultStatusValue: StatusOptionsValues;
  labelText: string;
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  status: string;
  timeValue: string;
  max?: number;
  min?: number;
  ref?: RefElementType;
  onSelectDate: (date: Date) => void;
  onSelectStatus: (selectedOptions: OptionType) => void;
};

const StatusInputs = ({
  status,
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  onSelectStatus,
  defaultStatusValue,
  ref,
  labelText,
  min,
  max,
}: StatusInputsProps) => {
  const { language } = useLanguage();

  const statusOptions: StatusOptionsValues[] = [
    {
      label: language.inactive,
      value: 'Inactive',
      id: 'inactive',
    },
    {
      label: language.scheduled,
      value: 'Scheduled',
      id: 'scheduled',
    },
    {
      label: language.published,
      value: 'Published',
      id: 'published',
    },
  ];

  const today = startOfDay(new Date());

  return (
    <>
      <Selectbox
        id="status"
        defaultValue={defaultStatusValue}
        options={statusOptions}
        onChange={onSelectStatus}
        name="status"
        labelText={labelText}
        ref={ref}
      />
      {status === 'Scheduled' && (
        <>
          <TimeInput
            value={timeValue}
            onChange={onTimeChange}
            id="time"
            labelText={language.publishTime}
            name="time"
            min={min}
            max={max}
          />
          <DatePicker
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            labelText={language.publishDate}
            disabled={(date: Date) => isBefore(date, today)}
            startMonth={new Date()}
            captionLayout="label"
          />
        </>
      )}
    </>
  );
};

export default StatusInputs;
