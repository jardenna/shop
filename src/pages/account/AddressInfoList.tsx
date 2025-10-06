import { Address } from '../../app/api/apiTypes/shopApiTypes';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import AddressInfoListContent from './AddressInfoListContent';

type AddressInforListProps = {
  address: Address;
  username: string;
  onDeleteAddress: (id: string) => void;
};

const AddressInfoList = ({
  address,
  username,
  onDeleteAddress,
}: AddressInforListProps) => {
  const { language } = useLanguage();

  return (
    <li className="my-address-item">
      <AddressInfoListContent address={address} username={username} />
      <div className="my-address-footer">
        <IconBtn
          iconName={IconName.Trash}
          title=""
          ariaLabel={language.delete}
          onClick={() => {
            onDeleteAddress(address.id);
          }}
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
