import { FC, ReactNode } from 'react';
import Button from '../Button';

interface DropdownProps {
  btnLabel: string;
  children: ReactNode;
  id: string;
  handleCallback?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  btnLabel,
  handleCallback,
  id,
}) => (
  <section className="dropdown" id={id}>
    {children}
    <Button onClick={handleCallback}>{btnLabel}</Button>
  </section>
);

export default Dropdown;
