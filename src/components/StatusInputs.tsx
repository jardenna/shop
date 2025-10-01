import { isBefore, startOfDay } from 'date-fns';
import type { Status } from '../app/api/apiTypes/adminApiTypes';
import useLanguage from '../features/language/useLanguage';
import type {
  InputChangeHandler,
  OptionType,
  refFormType,
} from '../types/types';
import DatePicker from './datePicker/DatePicker';
import TimeInput from './formElements/timeInput/TimeInput';
import Selectbox from './selectbox/Selectbox';

type StatusOptions = {
  label: string;
  value: Status;
};

export type StatusInputsProps = {
  defaultStatusValue: StatusOptions;
  labelText: string;
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  status: string;
  timeValue: string;
  max?: number;
  min?: number;
  ref?: refFormType;
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
