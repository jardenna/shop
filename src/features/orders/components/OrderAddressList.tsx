import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import AddressInfoListContent from '../../../pages/account/AddressInfoListContent';

interface OrderAddressListProps {
  addresses: Address[];
  refetch: () => void;
}

const OrderAddressList = ({ addresses, refetch }: OrderAddressListProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => refetch}
  >
    <ul className="address-list">
      {addresses.map((address) => (
        <li key={address.id} className="address-item">
          <AddressInfoListContent address={address} />
        </li>
      ))}
    </ul>
  </ErrorBoundary>
);

export default OrderAddressList;
