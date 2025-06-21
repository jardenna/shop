import { Status } from '../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../features/language/useLanguage';
import { ChangeInputType, OptionType, refFormType } from '../types/types';
import DatePicker from './datePicker/DatePicker';
import TimeInput from './formElements/timeInput/TimeInput';
import Selectbox from './selectbox/Selectbox';

export type StatusOptions = {
  label: string;
  value: Status;
};

export type StatusInputsProps = {
  defaultStatusValue: StatusOptions;
  labelText: string;
  selectedDate: Date;
  status: string;
  timeValue: string;
  max?: number;
  min?: number;
  ref?: refFormType;
  onSelectDate: (date: Date) => void;
  onSelectStatus: (selectedOptions: OptionType) => void;
  onTimeChange: (event: ChangeInputType) => void;
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
          />
        </>
      )}
    </>
  );
};

export default StatusInputs;
