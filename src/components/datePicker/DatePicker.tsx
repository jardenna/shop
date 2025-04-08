import { DayPicker, OnSelectHandler } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';
import FormLabel from '../formElements/FormLabel';

type DatePickerProps = {
  id: string;
  labelText: string;
  onSelectDate: OnSelectHandler<Date>;
  selectedDate: Date;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

function DatePicker({
  onSelectDate,
  selectedDate,
  required,
  labelText,
  id,
  inputHasNoLabel,
}: DatePickerProps) {
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
    <div className="input-container">
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
      <DayPicker
        fixedWeeks
        id={id}
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
