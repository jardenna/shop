import { DayPicker, OnSelectHandler } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';
import VisuallyHidden from '../VisuallyHidden';
import './_date-picker.scss';

type DatePickerProps = {
  labelText: string;
  onSelectDate: OnSelectHandler<Date>;
  selectedDate: Date;
  errorText?: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

function DatePicker({
  onSelectDate,
  selectedDate,
  labelText,
  required,
  inputHasNoLabel,
  errorText,
}: DatePickerProps) {
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
    <div className="input-container date-picker-container">
      <span className={inputHasNoLabel ? '' : 'form-label-container'}>
        {inputHasNoLabel ? (
          <VisuallyHidden>{labelText}</VisuallyHidden>
        ) : (
          <span>
            {labelText}
            {required && <span aria-hidden="true">*</span>}
          </span>
        )}
        {errorText && <span className="error-message">{errorText}</span>}
      </span>
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
