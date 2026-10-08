import { Address } from '../../app/api/apiTypes/addressApiTypes';
import DeleteAddressModal from '../../pages/account/DeleteAddressModal';
import AddressFormModal from './AddressFormModal';

interface AddressListFooterProps {
  address: Address;
  language: Record<string, string>;
}

const AddressListFooter = ({ address, language }: AddressListFooterProps) => (
  <div className="address-footer">
    {address.standardAddress.length === 0 && (
      <DeleteAddressModal address={address} />
    )}

    <AddressFormModal
      id={address.id}
      address={address}
      username={address.name}
      headerText={language.updateAddress}
      submitLabel={language.update}
      popupMessage={language.addressUpdated}
    />
  </div>
);

export default AddressListFooter;
