import { FC } from 'react';

interface ShoppingChartProps {
  name?: string;
}

const ShoppingChart: FC<ShoppingChartProps> = ({ name }) => (
  <section>Cart {name}</section>
);

export default ShoppingChart;
