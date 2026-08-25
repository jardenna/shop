import { Address } from '../../app/api/apiTypes/addressApiTypes';
import { useLanguage } from '../../features/language/useLanguage';

type AddressInforListProps = {
  address: Address;
  username?: string;
};

const AddressInfoListContent = ({
  address,
  username,
}: AddressInforListProps) => {
  const { language } = useLanguage();

  return (
    <article className="my-address-content">
      <h2 className="my-address-label">{language[address.label]}</h2>
      <h3 className="my-address-title">{address.name || username}</h3>
      <p>{address.street}</p>
      <p>
        {address.zipCode} {address.city}
      </p>
      <p>{address.country}</p>
    </article>
  );
};

export default AddressInfoListContent;
