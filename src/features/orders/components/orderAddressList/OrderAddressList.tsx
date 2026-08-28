import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { useLanguage } from '../../../language/useLanguage';
import './_order-address-list.scss';
import OrderAddressItem from './OrderAddressItem';

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
          <OrderAddressItem
            address={address}
            key={address.id}
            language={language}
          />
        ))}
      </ul>
    </ErrorBoundary>
  );
};
export default OrderAddressList;
