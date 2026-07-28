import { SelectedLanguage } from '../features/language/languageSlice';
import danishLang from '../locales/da.json';
import englishLang from '../locales/en.json';

const createLanguageProxy = (translations: Record<string, string>) =>
  new Proxy(translations, {
    get(target, property: string | symbol) {
      if (typeof property !== 'string') {
        return Reflect.get(target, property);
      }

      return target[property] ?? `[Missing translation: ${property}]`;
    },
  });

export const languageFiles: Record<SelectedLanguage, Record<string, string>> = {
  da: createLanguageProxy(danishLang),
  en: createLanguageProxy(englishLang),
};
