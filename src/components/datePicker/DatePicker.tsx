import { DayPicker, OnSelectHandler } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';

type DatePickerProps = {
  onSelectDate: OnSelectHandler<Date>;
  selectedDate: Date;
};

function DatePicker({ onSelectDate, selectedDate }: DatePickerProps) {
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
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
  );
}

export default DatePicker;
