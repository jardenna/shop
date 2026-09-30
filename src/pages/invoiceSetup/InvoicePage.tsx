import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';
import './_invoice-page.scss';
import orders from './data.json';

const InvoicePage = () => {
  console.log(orders);

  return (
    <section className="page">
      <div className="header">
        <Icon iconName={IconName.Logo} />
        <div className="heading">Invoice</div>
      </div>
    </section>
  );
};

export default InvoicePage;
