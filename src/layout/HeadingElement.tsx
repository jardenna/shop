import type { ReactNode } from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingElementProps = {
  children: ReactNode;
  ariaLabelledby?: string;
  as?: HeadingTag;
  className?: string;
};

const HeadingElement = ({
  children,
  ariaLabelledby,
  as: Tag = 'h2',
  className,
}: HeadingElementProps) => (
  <Tag className={className} id={ariaLabelledby}>
    {children}
  </Tag>
);

export default HeadingElement;
