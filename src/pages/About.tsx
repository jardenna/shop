import { FC } from 'react';
import CurrencySwitcher from '../features/currency/components/CurrencySwitcher';
import ProductPrice from '../features/currency/components/ProductPrice';
const About: FC = () => (
  <section>
    <CurrencySwitcher />
    <ProductPrice priceDKK={100000} />
  </section>
);

export default About;
