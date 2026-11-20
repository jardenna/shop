import type { ElementType, HTMLAttributes, ReactNode } from 'react';

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
