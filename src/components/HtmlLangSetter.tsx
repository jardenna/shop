// HtmlLangSetter.tsx
import { useEffect } from 'react';
import useLanguage from '../features/language/useLanguage';

const HtmlLangSetter = () => {
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  return null; // renders nothing
};

export default HtmlLangSetter;
