import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import IconContent from '../../components/IconContent';
import TriggerModalButton from '../../components/popModal/TriggerModalButton';
import { BtnVariant, IconName } from '../../types/enums';
import type { RefBtnType } from '../../types/types';
import AddressFormModal from './AddressFormModal';
import AddressInfoListContent from './AddressInfoListContent';
import DeleteAddressModal from './DeleteAddressModal';

interface AddressListProps {
  addresses: Address[];
  language: Record<string, string>;
  username: string;
  addAddressButtonRef?: RefBtnType;
  className?: string;
  triggerModalClassName?: string;
  refetch: () => void;
}

const AddressList = ({
  refetch,
  addresses,
  username,
  addAddressButtonRef,
  language,
  className = '',
  triggerModalClassName,
}: AddressListProps) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

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
                modalHeaderText={language.updateAddress}
                primaryActionBtnLabel={language.update}
                popupMessage={language.addressUpdated}
              />
            </div>
          </li>
        ))}
        <li className="address-item add-address">
          <AddressFormModal
            id={null}
            username={username}
            modalHeaderText={language.createNewAddress}
            primaryActionBtnLabel={language.createNewAddress}
            popupMessage={language.addressCreated}
            triggerModalDisabled={addresses.length === 4}
            addAddressButtonRef={addAddressButtonRef}
            triggerModalClassName={triggerModalClassName}
          />
        </li>
      </ul>
      {selectedAddress && (
        <DeleteAddressModal
          ariaControls={selectedAddress.id}
          itemId={selectedAddress.id}
          modalMessage={selectedAddress.street}
          modalId="address"
        />
      )}
    </ErrorBoundary>
  );
};

export default AddressList;
