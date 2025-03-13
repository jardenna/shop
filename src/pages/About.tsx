import { FC } from 'react';
import CurrencySelect from '../features/currency/components/CurrencySelect';
import ProductPrice from '../features/currency/components/ProductPrice';
import SelectTest from '../components/selectBox/SelectTest';
const About: FC = () => (
  <section>
    <SelectTest />
    <CurrencySelect />
    <ProductPrice priceDKK={10200} />
  </section>
);

export default About;
