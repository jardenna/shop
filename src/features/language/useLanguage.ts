import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import type { OptionType } from '../../types/types';
import {
  SelectedLanguage,
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

export const languageOptions: OptionType[] = [
  { value: 'da', label: 'Dansk' },
  { value: 'en', label: 'English' },
];

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  const [lang, setLang] = useLocalStorage(
    localStorageKeys.lang,
    selectedLanguage,
  );
  const language = useAppSelector(selectLanguage);

  const switchLanguage = (lang: SelectedLanguage) => {
    setLang(lang);
  };

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return { switchLanguage, language, selectedLanguage: lang };
};
