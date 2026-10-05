import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Address, AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import ChangeAddressModal from '../../components/Modal/ChangeAddressModal';
import { AddressSelectionNew } from '../../features/checkout/components/CheckoutAddressList';
import { useUpdateAddressMutation } from '../../features/profile/addressesApiSlice';
import { RefBtnType } from '../../types/types';
import AddressFormModal from './AddressFormModal';
import AddressFormModalNew from './AddressFormModalNew';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  language: Record<string, string>;
  username: string;
  buttonRef?: RefBtnType;
  refetch: () => void;
}

const AddressList = ({
  refetch,
  addresses,
  username,
  language,
  buttonRef,
}: AddressListProps) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [updateAddress] = useUpdateAddressMutation();

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const shippingAddressId =
    addresses.find((address) =>
      address.standardAddress.includes('addressDelivery'),
    )?.id ?? '';

  const billingAddressId =
    addresses.find((address) =>
      address.standardAddress.includes('addressBilling'),
    )?.id ?? '';

  const handleUpdateAddress = async (address: AddressInput) => {
    if (!address.id) {
      return;
    }

    await updateAddress({
      id: address.id,
      address,
    }).unwrap();
  };

  const handleChangeAddress = async ({
    shippingAddressId,
    billingAddressId,
  }: AddressSelectionNew) => {
    const shippingAddress = addresses.find(
      (address) => address.id === shippingAddressId,
    );

    const billingAddress = addresses.find(
      (address) => address.id === billingAddressId,
    );

    if (!shippingAddress || !billingAddress) {
      return;
    }

    if (shippingAddressId === billingAddressId) {
      await updateAddress({
        id: shippingAddress.id,
        address: {
          ...shippingAddress,
          standardAddress: ['addressDelivery', 'addressBilling'],
        },
      }).unwrap();

      return;
    }

    await updateAddress({
      id: shippingAddress.id,
      address: {
        ...shippingAddress,
        standardAddress: ['addressDelivery'],
      },
    }).unwrap();

    await updateAddress({
      id: billingAddress.id,
      address: {
        ...billingAddress,
        standardAddress: ['addressBilling'],
      },
    }).unwrap();
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch}
    >
      <ul className="address-list">
        {addresses.map((address) => (
          <li key={address.id} className="address-item">
            <AddressInfoListContent address={address} username={address.name} />

            <div className="address-footer">
              {address.standardAddress.length === 0 && (
                <DeleteAddressModal
                  selectedAddress={selectedAddress}
                  onClick={() => {
                    handleSelectAddress(address);
                  }}
                />
              )}

              <AddressFormModalNew
                id={address.id}
                address={address}
                username={address.name}
                headerText={language.updateAddress}
                submitLabel={language.update}
                popupMessage={language.addressUpdated}
                onSubmitAddress={handleUpdateAddress}
              />
            </div>
          </li>
        ))}
      </ul>

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
        />
      </div>
    </ErrorBoundary>
  );
};

export default AddressList;
