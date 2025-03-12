import { FC } from 'react';
import ProductPrice from './ProductPrice';
import CurrencySwitcher from '../features/currency/components/CurrencySwitcher';

const About: FC = () => (
  <section>
    <CurrencySwitcher />
    <ProductPrice priceDKK={100} />
  </section>
);

export default About;
