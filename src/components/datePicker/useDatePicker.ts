import { setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import { ChangeInputType } from '../../types/types';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeValue, setTimeValue] = useState('00:00');

  const parseTime = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    return { hours, minutes };
  };

  const handleTimeChange = (event: ChangeInputType) => {
    const value = event.target.value;
    const { hours, minutes } = parseTime(value);

    const updatedDate = setHours(setMinutes(selectedDate, minutes), hours);
    setSelectedDate(updatedDate);
    setTimeValue(value);
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) {
      setSelectedDate(undefined as unknown as Date); // or null if you change the state type
      return;
    }

    const { hours, minutes } = parseTime(timeValue);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    setSelectedDate(newDate);
  };

  return { handleTimeChange, handleDaySelect, selectedDate, timeValue };
};

export default useDatePicker;
