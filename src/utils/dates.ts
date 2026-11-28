import { format, startOfDay } from 'date-fns';
import type { SelectedLanguage } from '../features/language/languageSlice';
import type { Locales } from './locales';

export const dateToLocaleMap: Record<SelectedLanguage, Locales> = {
  en: 'en-US',
  da: 'da-DK',
};

export const dateFormat = {
  dateTimeLocal: "yyyy-MM-dd'T'HH:mm",
  date: 'yyyy-MM-dd',
};

export const startOfToday = startOfDay(new Date());

export const newDate = new Date();

export const formattedCurrentDate = format(newDate, dateFormat.date);
export const formattedCurrentDateTime = format(
  newDate,
  dateFormat.dateTimeLocal,
);
