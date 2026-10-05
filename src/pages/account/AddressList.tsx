import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import IconContent from '../../components/IconContent';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { AddressSelectionNew } from '../../features/checkout/components/CheckoutAddressList';
import { BtnVariant, IconName } from '../../types/enums';
import { RefBtnType } from '../../types/types';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import ChangeAddressModal from './ChangeAddressModal';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  language: Record<string, string>;
  username: string;
  buttonRef?: RefBtnType;
  className?: string;
  refetch: () => void;
}

const AddressList = ({
  refetch,
  addresses,
  username,
  language,
  className = '',
  buttonRef,
}: AddressListProps) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [changedAddress, setChangedAddress] =
    useState<AddressSelectionNew | null>(null);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleChangeAddress = (address: AddressSelectionNew) => {
    setChangedAddress(address);
  };

  const shippingAddressId =
    addresses.find((address) =>
      address.standardAddress.includes('addressDelivery'),
    )?.id ?? '';

  const billingAddressId =
    addresses.find((address) =>
      address.standardAddress.includes('addressBilling'),
    )?.id ?? '';

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
                changedAddress={changedAddress}
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
      <div className="add-address-actions">
        <ChangeAddressModal
          addresses={addresses}
          billingAddressId={billingAddressId}
          shippingAddressId={shippingAddressId}
          language={language}
          onSelectAddress={handleChangeAddress}
        />
        <AddressFormModal
          id={null}
          username={username}
          headerText={language.createNewAddress}
          submitLabel={language.createNewAddress}
          popupMessage={language.addressCreated}
          disabled={addresses.length === 4}
          buttonRef={buttonRef}
          changedAddress={null}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AddressList;
