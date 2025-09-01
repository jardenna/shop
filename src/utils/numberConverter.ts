type LanguageCode = 'da' | 'en' | 'de' | 'sv' | 'no';
type Locales = 'en-US' | 'en-GB' | 'de-DE' | 'da-DK' | 'sv-SE' | 'no-NO';

const languageToLocaleMap: Record<LanguageCode, Locales> = {
  da: 'da-DK',
  en: 'en-GB',
  de: 'de-DE',
  sv: 'sv-SE',
  no: 'no-NO',
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
