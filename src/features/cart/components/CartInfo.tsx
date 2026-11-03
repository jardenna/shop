import { Link } from 'react-router';
import { ShopPath } from '../../../layout/nav/enums';
import { Language } from '../../../types/types';

interface CartInfoProps {
  language: Language;
}

const CartInfo = ({ language }: CartInfoProps) => (
  <div className="cart-info">
    <span>
      <span className="cartinfo-text">{language.returnPeriod}</span>
      <Link to={`/${ShopPath.ShippingAndReturns}`}>
        {language.returnPolicyLink}
      </Link>
    </span>
    <span>
      <span className="cartinfo-text">{language.needHelp}?</span>
      <Link to={`/${ShopPath.CustomerService}`}>
        {language.contactCustomerService}
      </Link>
    </span>
  </div>
);

export default CartInfo;
