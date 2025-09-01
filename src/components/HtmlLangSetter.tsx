import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectSelectedLanguage } from '../features/language/languageSlice';

const HtmlLangSetter = () => {
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  return null; // renders nothing
};

export default HtmlLangSetter;
