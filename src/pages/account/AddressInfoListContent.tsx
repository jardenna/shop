import { Address } from '../../app/api/apiTypes/shopApiTypes';

type AddressInforListProps = {
  address: Address;
  username: string;
};

const AddressInfoListContent = ({
  address,
  username,
}: AddressInforListProps) => {
  // const { language } = useLanguage();
  console.log(12);

  return (
    <article className="my-address-content">
      <h2 className="my-address-title">
        {address.name || username}

        {/* <span>{language[address.label]}</span> */}
      </h2>
      <p>{address.street}</p>
      <p>
        {address.zipCode} {address.city}
      </p>
      <p>{address.country}</p>
    </article>
  );
};

export default AddressInfoListContent;
