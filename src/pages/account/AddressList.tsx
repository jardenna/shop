import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import type { RefBtnType } from '../../types/types';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  language: Record<string, string>;
  username: string;
  addAddressButtonRef?: RefBtnType;
  className?: string;
  triggerModalClassName?: string;
  refetch: () => void;
}

const AddressList = ({
  refetch,
  addresses,
  username,
  addAddressButtonRef,
  language,
  className = '',
  triggerModalClassName,
}: AddressListProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => refetch}
  >
    <ul className={`my-address-list ${className}`}>
      {addresses.map((address) => (
        <li key={address.id} className="my-address-item">
          <AddressInfoListContent address={address} username={address.name} />

          <div className="my-address-footer">
            <DeleteAddressModal id={address.id} modalMessage={address.street} />
            <AddressFormModal
              id={address.id}
              address={address}
              username={address.name}
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
          addAddressButtonRef={addAddressButtonRef}
          triggerModalClassName={triggerModalClassName}
        />
      </li>
    </ul>
  </ErrorBoundary>
);

export default AddressList;
