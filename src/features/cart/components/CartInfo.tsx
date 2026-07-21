import { Link } from 'react-router';

interface CartInfoProps {
  language: Record<string, string>;
}

const CartInfo = ({ language }: CartInfoProps) => (
  <div className="order-flow-info">
    <span>{language.pricesConfirmed}</span>
    <span>
      <span className="order-flow-info-text">{language.returnPeriod}</span>
      <Link to="/">{language.returnPolicyLink}</Link>
    </span>
    <span>
      <span className="order-flow-info-text">{language.needHelp}?</span>
      <Link to="/">{language.contactCustomerService}</Link>
    </span>
  </div>
);

export default CartInfo;
