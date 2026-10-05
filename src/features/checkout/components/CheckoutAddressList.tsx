import {
  Address,
  StandardAddress,
} from '../../../app/api/apiTypes/addressApiTypes';
import AddressFormModal from '../../../pages/account/AddressFormModal';
import AddressInfoListContent from '../../../pages/account/AddressInfoListContent';
import ChangeAddressModal from '../../../pages/account/ChangeAddressModal';
import { RefBtnType } from '../../../types/types';

export interface BaseAddressListProps {
  addresses: Address[];
  billingAddressId: string;
  language: Record<string, string>;
  shippingAddressId: string;
  onSelectAddress: (address: StandardAddress) => void;
}

interface CheckoutAddressListProps extends BaseAddressListProps {
  username: string;
  buttonRef?: RefBtnType;
}

const CheckoutAddressList = ({
  addresses,
  username,
  language,
  buttonRef,
  shippingAddressId,
  billingAddressId,
  onSelectAddress,
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
      {addresses.length > 1 && (
        <ChangeAddressModal
          addresses={addresses}
          billingAddressId={billingAddressId}
          shippingAddressId={shippingAddressId}
          language={language}
          onSelectAddress={onSelectAddress}
        />
      )}
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
