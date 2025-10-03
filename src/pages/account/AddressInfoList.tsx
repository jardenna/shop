import { Address } from '../../app/api/apiTypes/shopApiTypes';
import { AddressFieldListProps } from './AddressPage';

const addressFieldList: AddressFieldListProps[] = [
  {
    name: 'name',
    label: 'name',
  },
  {
    name: 'street',
    label: 'street',
  },
  {
    name: 'zipCode',
    label: 'zipCode',
  },
  {
    name: 'city',
    label: 'city',
  },
  {
    name: 'country',
    label: 'country',
  },
];

type AddressInforListProps = {
  address: Address;
};

const AddressInfoList = ({ address }: AddressInforListProps) => (
  <div>
    {addressFieldList.map((a, index) => (
      <div key={index}>{address[a.name]}</div>
    ))}
  </div>
);

export default AddressInfoList;
