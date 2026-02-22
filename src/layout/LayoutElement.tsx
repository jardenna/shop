import { type ElementType, type ReactNode } from 'react';

type LayoutElementProps = {
  children: ReactNode;
  ariaLabel?: string;
  as?: ElementType;
  className?: string;
};

const LayoutElement = ({
  children,
  ariaLabel,

  as: Tag = 'header',
  className,
}: LayoutElementProps) => (
  <Tag className={className} aria-label={ariaLabel}>
    {children}
  </Tag>
);
export default LayoutElement;
