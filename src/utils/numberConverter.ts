import type Locales from './locales';

type LanguageCode = 'da' | 'en' | 'de' | 'sv' | 'no';

const languageToLocaleMap: Record<LanguageCode, Locales> = {
  da: 'da-DK',
  en: 'en-GB',
  de: 'de-DE',
  sv: 'sv-SE',
  no: 'no-No',
};

const numberConvert = (rating: number, lang: LanguageCode) => {
  const locale = languageToLocaleMap[lang];
  const displayRating = new Intl.NumberFormat(locale, {
    minimumFractionDigits: rating % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(rating);

  return displayRating;
};

export { languageToLocaleMap, numberConvert };
