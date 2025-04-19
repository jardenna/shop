import { ElementType, ReactNode } from 'react';

type LayoutElementProps = {
  ariaLabel: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

const LayoutElement = ({
  children,
  ariaLabel,
  as: Tag = 'footer',
  className = '',
}: LayoutElementProps) => (
  <Tag className={className} aria-label={ariaLabel}>
    {children}
  </Tag>
);

export default LayoutElement;
