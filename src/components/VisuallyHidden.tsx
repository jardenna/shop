import { ElementType, FC, HTMLAttributes, ReactNode } from 'react';

interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  htmlFor?: string;
}

const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  as: Tag = 'span',
  children,
  ...props
}) => (
  <Tag className="visually-hidden" {...props}>
    {children}
  </Tag>
);

export default VisuallyHidden;
