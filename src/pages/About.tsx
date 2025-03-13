import { FC } from 'react';
import CurrencySelect from '../features/currency/components/CurrencySelect';
import CurrencySwitcher from '../features/currency/components/CurrencySwitcher';
import ProductPrice from '../features/currency/components/ProductPrice';
const About: FC = () => (
  <section>
    <CurrencySwitcher />
    <CurrencySelect />
    <ProductPrice priceDKK={10200} />
  </section>
);

export default About;
