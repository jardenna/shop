import { Address } from '../../../app/api/apiTypes/addressApiTypes';
import AddressFormModal from '../../../pages/account/AddressFormModal';
import AddressInfoListContent from '../../../pages/account/AddressInfoListContent';
import ChangeToStandardAddressModal from '../../../pages/account/ChangeToStandardAddressModal';
import { RefBtnType } from '../../../types/types';

interface CheckoutAddressListProps {
  addresses: Address[];
  language: Record<string, string>;
  username: string;
  buttonRef?: RefBtnType;
}

const CheckoutAddressList = ({
  addresses,
  username,
  language,
  buttonRef,
}: CheckoutAddressListProps) => (
  <>
    <ul className="address-list">
      {addresses.map((address) => (
        <li key={address.id} className="address-item">
          <AddressInfoListContent address={address} username={address.name} />
        </li>
      ))}
    </ul>
    <div className="add-address-actions">
      <ChangeToStandardAddressModal addresses={addresses} />
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

export default CheckoutAddressList;
