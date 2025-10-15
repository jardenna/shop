import type { ElementType, ReactNode } from 'react';

type LayoutElementProps = {
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledby?: string;
  as?: ElementType;
  className?: string;
};

const LayoutElement = ({
  children,
  ariaLabel,
  ariaLabelledby,
  as: Tag = 'header',
  className,
}: LayoutElementProps) => (
  <Tag
    className={className}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
  >
    {children}
  </Tag>
);

export default LayoutElement;
