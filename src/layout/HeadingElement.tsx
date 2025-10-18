import type { ReactNode } from 'react';
import type { AriaLive, HeadingTag } from '../types/types';

type HeadingElementProps = {
  children: ReactNode;
  ariaLabelledby?: string;
  ariaLive?: AriaLive;
  as?: HeadingTag;
  className?: string;
};

const HeadingElement = ({
  children,
  ariaLive,
  ariaLabelledby,
  as: Tag = 'h2',
  className,
}: HeadingElementProps) => (
  <Tag className={className} id={ariaLabelledby} aria-live={ariaLive}>
    {children}
  </Tag>
);

export default HeadingElement;
