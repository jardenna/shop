import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

export const languageOptions = [
  { value: 'da', label: 'Dansk' },
  { value: 'en', label: 'English' },
];

const useLanguage = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  const [lang, setLang] = useLocalStorage('lang', selectedLanguage);
  const language = useAppSelector(selectLanguage);

  const switchLanguage = (lang: any) => {
    if (lang.value) {
      setLang(lang.value);
    } else {
      setLang(lang);
    }
  };

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return { switchLanguage, language, selectedLanguage: lang };
};

export default useLanguage;
