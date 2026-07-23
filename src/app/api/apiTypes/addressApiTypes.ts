import { StandardAddress } from './sharedApiTypes';

export type AddressFields = {
  city: string;
  country: string;
  name: string;
  street: string;
  zipCode: string;
};

export type BaseAddress = AddressFields & {
  standardAddress: StandardAddress[];
};

export type Address = BaseAddress & {
  id: string;
  label: string;
  name: string;
};

export type AddressInput = BaseAddress & {
  id: string | null;
};

export type AddAddressRequest = {
  address: AddressInput;
};

export type UpdateAddressRequest = { address: AddressInput; id: string };
