import { ReactNode, useState } from 'react';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import Button from './Button';

type ToggleContentProps = {
  btnVariant: BtnVariant;
  children: ReactNode;
  className?: string;
};

function ToggleContent({
  children,
  className = '',
  btnVariant,
}: ToggleContentProps) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={`${className} ${expanded ? 'expanded' : 'collapsed'}`}>
        {children}
      </div>

      <Button
        onClick={() => {
          setExpanded(!expanded);
        }}
        variant={btnVariant}
        className="toggle-content-btn"
      >
        {expanded ? language.showLessTags : language.showAllTags}
      </Button>
    </div>
  );
}

export default ToggleContent;
