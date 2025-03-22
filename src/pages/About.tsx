import { FC } from 'react';
import UserTable from '../components/table/UserTable';
import ProductPrice from '../features/currency/components/ProductPrice';
import useLanguage from '../features/language/useLanguage';

const About: FC = () => {
  const { language } = useLanguage();
  const tableHeaders = [language.username, language.email, language.role, ''];
  return (
    <section>
      <UserTable tableHeaders={tableHeaders} />
      <ProductPrice price={10200} />
    </section>
  );
};

export default About;
