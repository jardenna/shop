import { FC } from 'react';
import ProductPrice from '../features/currency/components/ProductPrice';
import Test from '../components/table/Test';

const About: FC = () => (
  <section>
    <Test />
    <ProductPrice price={10200} />
  </section>
);

export default About;
