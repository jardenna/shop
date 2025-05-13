import { ChangeEvent, FormEvent, MouseEvent } from 'react';

export type SortOrderType = 'asc' | 'desc';

export type ButtonEventType = MouseEvent<HTMLButtonElement>;
export type ChangeInputType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OptionType<T = string> = {
  label: string;
  value: T;
};

export type ButtonType = 'submit' | 'reset' | 'button';
export type BlurEventType = { target: { name: string } };
export type FormEventType = FormEvent<HTMLFormElement>;

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
