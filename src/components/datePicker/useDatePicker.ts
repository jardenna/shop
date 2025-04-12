import { setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import { ChangeInputType } from '../../types/types';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [timeValue, setTimeValue] = useState<string>('00:00');

  const handleTimeChange = (event: ChangeInputType) => {
    const { value } = event.target;

    const [hours, minutes] = value.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedDate, minutes), hours);
    setSelectedDate(newSelectedDate);
    setTimeValue(value);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelectedDate(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedDate(newDate);
  };

  return { handleTimeChange, handleDaySelect, selectedDate, timeValue };
};

export default useDatePicker;
