import { format, setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import { ChangeInputType } from '../../types/types';

const useDatePicker = ({ initialTime }: { initialTime?: Date } = {}) => {
  const initTime = initialTime || new Date();
  const formattedTime = format(initTime, 'HH:mm');
  const [selectedDate, setSelectedDate] = useState<Date>(initTime);
  const [timeValue, setTimeValue] = useState(formattedTime);

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
      setSelectedDate(undefined as unknown as Date);
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
