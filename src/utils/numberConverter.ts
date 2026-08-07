import type { Locales } from './locales';

type LanguageCode = 'da' | 'en' | 'de' | 'sv' | 'no';

export const languageToLocaleMap: Record<LanguageCode, Locales> = {
  da: 'da-DK',
  en: 'en-GB',
  de: 'de-DE',
  sv: 'sv-SE',
  no: 'no-No',
};
