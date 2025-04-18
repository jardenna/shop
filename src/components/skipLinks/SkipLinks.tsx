import { useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import './_skip-links.scss';

const SkipLink = () => {
  const { language } = useLanguage();

  const [isVisible, setIsVisible] = useState(false);

  const handleBlur = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  return (
    <div className={`skip-link ${isVisible ? 'is-visible' : ''}`}>
      <a href="#main" onBlur={handleBlur}>
        {language.goToContent}
      </a>
    </div>
  );
};

export default SkipLink;
