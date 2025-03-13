import { FC } from 'react';
import CurrencySelect from '../features/currency/components/CurrencySelect';
import ProductPrice from '../features/currency/components/ProductPrice';
const About: FC = () => (
  <section>
    <CurrencySelect />
    <ProductPrice priceDKK={10200} />
  </section>
);

export default About;
