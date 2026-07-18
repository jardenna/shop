import { Link } from 'react-router';

interface CartInfoProps {
  language: Record<string, string>;
}

const CartInfo = ({ language }: CartInfoProps) => (
  <div className="cart-page-info">
    <span>{language.pricesConfirmed}</span>
    <span>
      <span className="cart-page-info-text">{language.returnPeriod}</span>
      <Link to="/">{language.returnPolicyLink}</Link>
    </span>
    <span>
      <span className="cart-page-info-text">{language.needHelp}?</span>
      <Link to="/">{language.contactCustomerService}</Link>
    </span>
  </div>
);

export default CartInfo;
