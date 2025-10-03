import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';

// const addressFieldList: AddressFieldListProps[] = [
//   {
//     name: 'name',
//     label: 'name',
//   },
//   {
//     name: 'street',
//     label: 'street',
//   },
//   {
//     name: 'zipCode',
//     label: 'zipCode',
//   },
//   {
//     name: 'city',
//     label: 'city',
//   },
//   {
//     name: 'country',
//     label: 'country',
//   },
// ];

type AddressInforListProps = {
  address: Address;
  username: string;
};

const AddressInfoList = ({ address, username }: AddressInforListProps) => {
  const { language } = useLanguage();

  return (
    <li className="my-address-item">
      <div className="my-address-content">
        <p className="my-address-title">{address.name || username}</p>
        <p>{address.street}</p>
        <p>
          {address.zipCode} {address.city}
        </p>
        <p>{address.country}</p>
      </div>
      <div className="my-address-footer">
        <IconBtn
          iconName={IconName.Trash}
          title=""
          ariaLabel={language.delete}
        />
        <IconBtn
          iconName={IconName.Pencil}
          title=""
          ariaLabel={language.update}
        />
      </div>
    </li>
  );
};

export default AddressInfoList;
