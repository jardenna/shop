import Icon from '../components/icons/Icon';
import { IconName } from '../types/enums';
import './_invoice.scss';

// interface InvoicePageProps {
//   order: OrderResponse;
// }

const InvoicePage = () => (
  <section className="page">
    <Icon iconName={IconName.Logo} />
    <div className="heading">Invoice</div>
  </section>
);

export default InvoicePage;
