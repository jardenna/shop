import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { useLanguage } from '../../../language/useLanguage';
import './_order-address-list.scss';

interface OrderAddressListProps {
  addresses: Address[];
  refetch: () => void;
}

const OrderAddressList = ({ addresses, refetch }: OrderAddressListProps) => {
  const { language } = useLanguage();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch}
    >
      <ul className="order-address-list">
        {addresses.map((address) => (
          <li key={address.id} className="order-address-item">
            <article className="order-address-content">
              <h2 className="address-label">{language[address.label]}</h2>
              <h3 className="address-title">{address.name}</h3>
              <p>{address.street}</p>
              <p>
                {address.zipCode} {address.city}
              </p>
              <p>{address.country}</p>
            </article>
          </li>
        ))}
      </ul>
    </ErrorBoundary>
  );
};
export default OrderAddressList;
