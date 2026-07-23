import { HTMLInputTypeAttribute } from 'react';
import { IconName } from '../../../types/enums';
import { InputMode } from '../../../types/types';

export type PaymentMethods = 'visa' | 'paypal' | 'mobilepay' | 'mastercard';
export type PaymentStatus = 'pending' | 'failed' | 'paid';

export interface PaymentMethodField {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  inputMode?: InputMode;
}

export interface PaymentMethod {
  fields: PaymentMethodField[];
  icon: IconName;
  id: PaymentMethods;
  label: string;
}
