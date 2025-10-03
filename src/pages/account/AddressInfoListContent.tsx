import { Address } from '../../app/api/apiTypes/shopApiTypes';

type AddressInforListProps = {
  address: Address;
  username: string;
};

const AddressInfoListContent = ({
  address,
  username,
}: AddressInforListProps) => (
  <div className="my-address-content">
    <p className="my-address-title">{address.name || username}</p>
    <p>{address.street}</p>
    <p>
      {address.zipCode} {address.city}
    </p>
    <p>{address.country}</p>
  </div>
);

export default AddressInfoListContent;
