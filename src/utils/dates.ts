import type { SelectedLanguage } from '../features/language/languageSlice';
import Locales from './locales';

const dateToLocaleMap: Record<SelectedLanguage, Locales> = {
  en: 'en-US',
  da: 'da-DK',
};

export default dateToLocaleMap;
