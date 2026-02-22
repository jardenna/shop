import type { ElementType, ReactNode } from 'react';
import { HTMLAttributes } from 'react';

type VisuallyHiddenProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: ElementType;
  htmlFor?: string;
  id?: string;
};

const VisuallyHidden = ({
  as: Tag = 'span',
  children,
  ...props
}: VisuallyHiddenProps) => (
  <Tag className="visually-hidden" {...props}>
    {children}
  </Tag>
);

export default VisuallyHidden;
