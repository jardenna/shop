/* eslint-disable import/named */
import { FC } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

export type OptionType = {
  label: string;
  value: number | string;
};

interface NewSelectBoxProps {
  defaultValue: OptionType;
  id: string;
  onChange: any;
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  isMulti?: boolean;
}

const NewSelectBox: FC<NewSelectBoxProps> = ({
  options,
  isMulti,
  onChange,
  defaultValue,
  id,
}) => (
  <Select
    classNamePrefix="select-box"
    isMulti={isMulti}
    options={options}
    onChange={onChange}
    defaultValue={defaultValue}
    inputId={id}
    menuPlacement="auto"
  />
);

export default NewSelectBox;
