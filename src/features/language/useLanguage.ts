import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import type { OptionTypeNew } from '../../types/types';
import {
  SelectedLanguage,
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

export const languageOptions: OptionTypeNew[] = [
  { value: 'da', label: 'Dansk', id: 'da' },
  { value: 'en', label: 'English', id: 'en' },
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
