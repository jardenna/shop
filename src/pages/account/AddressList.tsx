import { Address, AddressInput } from '../../app/api/apiTypes/addressApiTypes';
import { AddressSelection } from '../../app/api/apiTypes/orderApiTypes';
import ChangeAddressModal from '../../components/Modal/ChangeAddressModal';
import { RefBtnType } from '../../types/types';
import AddressFormModal from './AddressFormModal';
import AddressFormModalNew from './AddressFormModalNew';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  billingAddressId: string;
  isLoading: boolean;
  language: Record<string, string>;
  shippingAddressId: string;
  username: string;
  buttonRef?: RefBtnType;
  onChangeAddress: (address: AddressSelection) => void;
  onUpdateAddress: (address: AddressInput) => Promise<void>;
}

const AddressList = ({
  addresses,
  username,
  language,
  buttonRef,
  billingAddressId,
  shippingAddressId,
  onChangeAddress,
  onUpdateAddress,
  isLoading,
}: AddressListProps) => (
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
              onSubmitAddress={onUpdateAddress}
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
        onChangeAddress={onChangeAddress}
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

export default AddressList;
