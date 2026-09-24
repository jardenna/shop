import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import IconContent from '../../components/IconContent';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { BtnVariant, IconName } from '../../types/enums';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
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
}: AddressListProps) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch}
    >
      <ul className={`address-list ${className}`}>
        {addresses.map((address) => (
          <li key={address.id} className="address-item">
            <AddressInfoListContent address={address} username={address.name} />

            <div className="address-footer">
              <TriggerModalButton
                ariaControls={address.id}
                modalId="address"
                variant={BtnVariant.Ghost}
                onClick={() => {
                  handleSelectAddress(address);
                }}
              >
                <IconContent
                  iconName={IconName.Trash}
                  ariaLabel={language.deleteAddress}
                />
              </TriggerModalButton>

              <AddressFormModal
                id={address.id}
                address={address}
                username={address.name}
                headerText={language.updateAddress}
                submitLabel={language.update}
                popupMessage={language.addressUpdated}
              />
            </div>
          </li>
        ))}
      </ul>
      {selectedAddress && (
        <DeleteAddressModal
          ariaControls={selectedAddress.id}
          itemId={selectedAddress.id}
          modalMessage={selectedAddress.street}
          modalId="address"
        />
      )}
      <div className="add-address">
        <AddressFormModal
          id={null}
          username={username}
          headerText={language.createNewAddress}
          submitLabel={language.createNewAddress}
          popupMessage={language.addressCreated}
          disabled={addresses.length === 4}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AddressList;
