import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { da, enGB } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import useLanguage from '../../features/language/useLanguage';

function DatePicker() {
  const [selected, setSelected] = useState<Date>(new Date());
  const { selectedLanguage } = useLanguage();

  const locales = selectedLanguage === 'en' ? enGB : da;

  return (
    <DayPicker
      fixedWeeks
      required
      startMonth={new Date()}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      today={new Date()}
      locale={locales}
    />
  );
}

export default DatePicker;
