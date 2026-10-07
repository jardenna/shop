import { ReactNode } from 'react';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import ChangeAddressModal from '../../components/Modal/ChangeAddressModal';
import { RefBtnType } from '../../types/types';
import { StandardAddressIds } from '../../utils/addressUtils';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';

interface AddressListProps {
  addresses: Address[];
  billingAddressId: string;
  language: Record<string, string>;
  shippingAddressId: string;
  username: string;
  buttonRef?: RefBtnType;
  onChangeAddress: (address: StandardAddressIds) => void;
  renderAddressFooter?: (address: Address) => ReactNode;
}
const AddressList = ({
  addresses,
  username,
  language,
  buttonRef,
  billingAddressId,
  shippingAddressId,
  onChangeAddress,
  renderAddressFooter,
}: AddressListProps) => (
  <>
    <ul className="address-list">
      {addresses.map((address) => (
        <li key={address.id} className="address-item">
          <AddressInfoListContent address={address} username={address.name} />
          {renderAddressFooter?.(address)}
        </li>
      ))}
    </ul>

    <div className="address-actions">
      {addresses.length > 1 && (
        <ChangeAddressModal
          addresses={addresses}
          billingAddressId={billingAddressId}
          shippingAddressId={shippingAddressId}
          language={language}
          onChangeAddress={onChangeAddress}
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

export default AddressList;
