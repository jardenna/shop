import type {
  ButtonHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  RefObject,
} from 'react';
import type { IconName } from '../components/icons/iconConstants';
import type { BtnVariant, KeyCode } from './constants';

export type ButtonEventType = MouseEvent<HTMLButtonElement>;
export type ChangeInputType = ChangeEvent<HTMLInputElement>;
export type ChangeTextAreaType = ChangeEvent<HTMLTextAreaElement>;
export type BlurEventType = { target: { name: string } };
export type FocusEventType = FocusEvent<HTMLElement>;
export type RefElementType = RefObject<HTMLElement | null>;
export type RefInputType = RefObject<HTMLInputElement | null>;
export type RefBtnType = RefObject<HTMLButtonElement | null>;
export type RefFormType = RefObject<HTMLFormElement | null>;
export type AutoComplete = 'on' | 'off';
export type Language = Record<string, string>;

export type KeyCodeValue = (typeof KeyCode)[keyof typeof KeyCode];
export type BtnVariantValue = (typeof BtnVariant)[keyof typeof BtnVariant];
export type BtnType = ButtonHTMLAttributes<HTMLButtonElement>['type'];
export type IconNameValue = (typeof IconName)[keyof typeof IconName];
export type OmitChecked<T, K extends keyof T> = Omit<T, K>;

export interface OptionType<T = string> {
  label: string;
  value: T;
}

export interface OptionGroupHeading {
  id: string;
  title: string;
  errorText?: string;
}

export type InputChangeHandler = (event: ChangeInputType) => void;

export type ImgExtention = 'png' | 'jpg' | 'WebP';

export type InputType =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type ControlInputType = Extract<
  HTMLInputTypeAttribute,
  'checkbox' | 'radio'
>;

export type AriaHasPopup =
  boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

export type AriaCurrentType =
  'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

export type InputMode =
  'numeric' | 'decimal' | 'search' | 'tel' | 'url' | 'email';

export type FiltersCountResult = {
  countsByKey: Record<string, number>;
  totalCount: number;
};

export type SizeVariant =
  'mini' | 'small' | 'medium' | 'large' | 'x-large' | 'full';

export type PopupRole = 'alert' | 'status';

export interface ChartData {
  date: string;
  value: number;
}
