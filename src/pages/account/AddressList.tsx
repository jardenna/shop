import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Address, AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import IconContent from '../../components/IconContent';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { AddressSelectionNew } from '../../features/checkout/components/CheckoutAddressList';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/addressesApiSlice';
import { BtnVariant, IconName } from '../../types/enums';
import { RefBtnType } from '../../types/types';
import AddressFormModalNew from './AddressFormModalNew';
import AddressInfoListContent from './AddressInfoListContent';
import ChangeAddressModal from './ChangeAddressModal';
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
  const [addAddress] = useAddAddressMutation();

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

  const handleAddAddress = async (address: AddressInput) => {
    await addAddress({
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
              <TriggerModalButton
                ariaControls={address.id}
                modalId="delete-address"
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

      {selectedAddress && (
        <DeleteAddressModal
          ariaControls={selectedAddress.id}
          itemId={selectedAddress.id}
          modalMessage={selectedAddress.street}
          modalId="delete-address"
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

        <AddressFormModalNew
          id={null}
          username={username}
          headerText={language.createNewAddress}
          submitLabel={language.createNewAddress}
          popupMessage={language.addressCreated}
          disabled={addresses.length === 4}
          buttonRef={buttonRef}
          onSubmitAddress={handleAddAddress}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AddressList;
