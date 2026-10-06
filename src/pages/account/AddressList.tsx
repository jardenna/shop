import { Address, AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import { AddressSelection } from '../../app/api/apiTypes/orderApiTypes';
import ChangeAddressModal from '../../components/Modal/ChangeAddressModal';
import { useUpdateAddressMutation } from '../../features/profile/addressesApiSlice';
import { RefBtnType } from '../../types/types';
import { getAddressUpdates } from '../../utils/addressUtils';
import AddressFormModal from './AddressFormModal';
import AddressFormModalNew from './AddressFormModalNew';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  billingAddressId: string;
  language: Record<string, string>;
  shippingAddressId: string;
  username: string;
  buttonRef?: RefBtnType;
}

const AddressList = ({
  addresses,
  username,
  language,
  buttonRef,
  billingAddressId,
  shippingAddressId,
}: AddressListProps) => {
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

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
  }: AddressSelection) => {
    const addressUpdates = getAddressUpdates({
      shippingAddressId,
      billingAddressId,
    });

    for (const { addressId, standardAddress } of addressUpdates) {
      const address = addresses.find((item) => item.id === addressId);

      if (!address) {
        return;
      }

      await updateAddress({
        id: address.id,
        address: {
          ...address,
          standardAddress,
        },
      }).unwrap();
    }
  };

  return (
    <>
      <ul className="address-list">
        {addresses.map((address) => (
          <li key={address.id} className="address-item">
            <AddressInfoListContent address={address} username={address.name} />

            <div className="address-footer">
              {address.standardAddress.length === 0 && (
                <DeleteAddressModal address={address} />
              )}

              <AddressFormModalNew
                id={address.id}
                address={address}
                username={address.name}
                headerText={language.updateAddress}
                submitLabel={language.update}
                popupMessage={language.addressUpdated}
                onSubmitAddress={handleUpdateAddress}
                isLoading={isLoading}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="address-actions">
        <ChangeAddressModal
          addresses={addresses}
          billingAddressId={billingAddressId}
          shippingAddressId={shippingAddressId}
          language={language}
          onChangeAddress={handleChangeAddress}
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
    </>
  );
};

export default AddressList;
