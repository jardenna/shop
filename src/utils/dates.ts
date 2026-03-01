import type { SelectedLanguage } from '../features/language/languageSlice';
import type { Locales } from './locales';

export const dateToLocaleMap: Record<SelectedLanguage, Locales> = {
  en: 'en-US',
  da: 'da-DK',
};
