import { Address, AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import AddressFormModalNew from './AddressFormModalNew';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListFooterProps {
  address: Address;
  isLoading: boolean;
  language: Record<string, string>;
  onSubmitAddress: (address: AddressInput) => Promise<void>;
}

const AddressListFooter = ({
  address,
  language,
  isLoading,
  onSubmitAddress,
}: AddressListFooterProps) => (
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
      onSubmitAddress={onSubmitAddress}
      isLoading={isLoading}
    />
  </div>
);

export default AddressListFooter;
