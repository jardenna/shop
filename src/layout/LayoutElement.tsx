import { ElementType, FC, ReactNode } from 'react';

interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

const LayoutElement: FC<LayoutElementProps> = ({
  children,
  ariaLabel,
  as: Tag = 'footer',
  className = '',
}) => (
  <Tag className={className} aria-label={ariaLabel}>
    {children}
  </Tag>
);

export default LayoutElement;
