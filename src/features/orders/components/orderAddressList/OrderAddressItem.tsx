import { Address } from '../../../../app/api/apiTypes/addressApiTypes';

interface OrderAddressItemProps {
  address: Address;
  language: Record<string, string>;
}

const OrderAddressItem = ({ address, language }: OrderAddressItemProps) => (
  <li className="order-address-item">
    <article className="order-address-content">
      <h2 className="address-label">{language[address.label]}</h2>
      <h3 className="address-title">{address.name}</h3>
      <p>{address.street}</p>
      <p>
        {address.zipCode} {address.city}
      </p>
      <p>{address.country}</p>
    </article>
  </li>
);

export default OrderAddressItem;
