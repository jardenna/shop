import { ReactNode, useEffect, useRef, useState } from 'react';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import Button from './Button';

type ToggleContentProps = {
  children: ReactNode;
  btnVariant?: BtnVariant;
  className?: string;
  collapsedHeight?: number; // px height before toggle
};

function ToggleContent({
  children,
  className = '',
  btnVariant,
  collapsedHeight = 123, // default collapsed height (e.g. ~3 rows of tags)
}: ToggleContentProps) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      // Compare natural scrollHeight vs. collapsed height
      setIsOverflowing(el.scrollHeight > collapsedHeight);
    }
  }, [children, collapsedHeight]);

  return (
    <>
      <div
        ref={contentRef}
        className={`toggle-content ${className} ${!expanded ? 'collapsed' : ''}`}
      >
        {children}
      </div>

      {isOverflowing && (
        <Button
          onClick={() => {
            setExpanded(!expanded);
          }}
          variant={btnVariant}
          className="toggle-content-btn"
        >
          {expanded ? language.showLessTags : language.showAllTags}
        </Button>
      )}
    </>
  );
}

export default ToggleContent;
