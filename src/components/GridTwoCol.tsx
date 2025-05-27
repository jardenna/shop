import { ReactNode } from 'react';

type GridTwoColProps = {
  children: ReactNode;
};

const GridTwoCol = ({ children }: GridTwoColProps) => (
  <div className="grid grid-two-col">{children}</div>
);

export default GridTwoCol;
