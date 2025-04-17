import { DayPicker, OnSelectHandler } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';
import './_date-picker.scss';

type DatePickerProps = {
  labelText: string;
  onSelectDate: OnSelectHandler<Date>;
  selectedDate: Date;
};

function DatePicker({
  onSelectDate,
  selectedDate,
  labelText,
}: DatePickerProps) {
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
    <div className="input-container date-picker-container">
      <span>{labelText}</span>
      <DayPicker
        fixedWeeks
        required
        startMonth={new Date()}
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        today={new Date()}
        locale={locales}
      />
    </div>
  );
}

export default DatePicker;
