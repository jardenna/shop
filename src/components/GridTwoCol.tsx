import { ReactNode } from 'react';

type GridTwoColProps = {
  children: ReactNode;
  text: string;
};

const GridTwoCol = ({ children, text }: GridTwoColProps) => (
  <div className="grid grid-two-col">
    <strong>{text}:</strong>
    <span className="flex-align-right">{children}</span>
  </div>
);

export default GridTwoCol;
