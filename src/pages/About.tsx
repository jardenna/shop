import { FC } from 'react';
import ProductPrice from '../features/currency/components/ProductPrice';
const About: FC = () => (
  <section>
    <ProductPrice priceDKK={10200} />
  </section>
);

export default About;
