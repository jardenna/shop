import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import DatePicker from '../datePicker/DatePicker';
import FieldSet from '../fieldset/FieldSet';
import TimeInput from '../formElements/timeInput/TimeInput';

type SharedDatePickerProps = {
  categoryStatus: string;
  legendText: string;
  onSelectDate: any;
  selectedDate: Date;
  timeValue: any;
  onTimeChange: (event: ChangeInputType) => void;
};

const SharedDatePicker = ({
  categoryStatus,
  onSelectDate,
  legendText,
  selectedDate,
  timeValue,
  onTimeChange,
}: SharedDatePickerProps) => {
  const { language } = useLanguage();

  return (
    <FieldSet legendText={legendText}>
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
