import { useNavigate } from 'react-router';
import { Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import Button from '../../../components/Button';
import { ShopPath } from '../../../layout/nav/enums';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './cartSummary.styles.scss';

interface CartSummaryProps {
  language: Record<string, string>;
  summary: Summary;
}

const CartSummary = ({ summary, language }: CartSummaryProps) => {
  const navigate = useNavigate();
  const summaryItems = [
    {
      label: language.subtotal,
      price: summary.subTotal,
    },
    summary.discountPrice > 0
      ? {
          label: language.discount,
          price: summary.discountPrice,
          className: 'summary-discount',
        }
      : null,
    {
      label: language.estimatedShipping,
      price: summary.shippingPrice,
    },
    {
      label: language.totalPrice,
      price: summary.totalPrice,
      className: 'summary-total',
    },
  ].filter((item) => item !== null);

  const handleCheckout = () => {
    navigate(`/${ShopPath.Checkout}`);
  };

  return (
    <aside className="summary-list">
      <h2>{language.orderSummary}</h2>
      {summaryItems.map(({ label, price, className }) => (
        <div key={label} className={`summary-item ${className ?? ''}`}>
          <span>{label}</span>
          <span className="summary-info">
            <ProductPrice price={price} />
          </span>
        </div>
      ))}
      <Button onClick={handleCheckout}>Fortsæt til kassen</Button>
    </aside>
  );
};
export default CartSummary;
