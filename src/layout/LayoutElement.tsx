import type { ElementType, ReactNode } from 'react';

interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

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
