import { DayPicker, OnSelectHandler } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';
import FormLabel from '../formElements/FormLabel';
import './_date-picker.scss';

type DatePickerProps = {
  labelText: string;
  onSelectDate: OnSelectHandler<Date>;
  selectedDate: Date;
  errorText?: string;
  id?: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

function DatePicker({
  onSelectDate,
  selectedDate,
  labelText,
  id,
  required,
  inputHasNoLabel,
  errorText,
}: DatePickerProps) {
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
    <div className="input-container date-picker-container">
      <FormLabel
        required={required}
        labelText={labelText}
        id={id || ''}
        inputHasNoLabel={inputHasNoLabel}
        errorText={errorText}
      />
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
