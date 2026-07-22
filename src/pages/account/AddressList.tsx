import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';
import { AddressLab } from '../../app/api/apiTypes/shopApiTypes';

interface AddressListProps {
  addresses: AddressLab[];
  language: Record<string, string>;
  username: string;
  className?: string;
  refetch: () => void;
}

const AddressList = ({
  refetch,
  addresses,
  username,
  language,
  className = '',
}: AddressListProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => refetch}
  >
    <ul className={`my-address-list ${className}`}>
      {addresses.map((address) => (
        <li key={address.id} className="my-address-item">
          <AddressInfoListContent
            address={address}
            username={address.name ?? ''}
          />

          <div className="my-address-footer">
            <DeleteAddressModal id={address.id} modalMessage={address.street} />
            <AddressFormModal
              id={address.id}
              address={address}
              username={address.name ?? ''}
              modalHeaderText={language.updateAddress}
              primaryActionBtnLabel={language.update}
              popupMessage={language.addressUpdated}
            />
          </div>
        </li>
      ))}
      <li className="my-address-item add-address">
        <AddressFormModal
          id={null}
          username={username}
          modalHeaderText={language.createNewAddress}
          primaryActionBtnLabel={language.createNewAddress}
          popupMessage={language.addressCreated}
          triggerModalDisabled={addresses.length === 4}
        />
      </li>
    </ul>
  </ErrorBoundary>
);

export default AddressList;
