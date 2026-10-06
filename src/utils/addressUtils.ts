import { Address, StandardAddress } from '../app/api/apiTypes/addressApiTypes';

interface FindStandardAddress {
  id: StandardAddress;
  addresses?: Address[];
}

export const findStandardAddress = ({ id, addresses }: FindStandardAddress) =>
  addresses?.find((address) => address.standardAddress.includes(id))?.id ?? '';
