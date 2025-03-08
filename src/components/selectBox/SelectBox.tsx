/* eslint-disable import/named */
import { FC } from 'react';
import Select, {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SelectComponentsConfig,
  SingleValue,
} from 'react-select';

import variables from '../../scss/variables.module.scss';
import FormLabel from '../formElements/FormLabel';
import './_select-box.scss';

export type Option = { label: string; value: number | string; count?: number };
export type SelectedOption = SingleValue<Option> | MultiValue<Option>;

interface SelectBoxProps {
  defaultValue: Option | Option[] | null;
  id: string;
  labelText: string;
  name: string;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  className?: string;
  closeMenuOnSelect?: boolean;
  components?: SelectComponentsConfig<Option, boolean, GroupBase<Option>>;
  inputHasNoLabel?: boolean;
  inputValue?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange: (value: SelectedOption) => void;
  onInputChange?: (value: string) => void;
}

const SelectBox: FC<SelectBoxProps> = ({
  className = '',
  name,
  id,
  options,
  placeholder = '',
  onChange,
  closeMenuOnSelect,
  isMulti,
  inputHasNoLabel,
  required,
  labelText,
  isSearchable = false,
  onInputChange,
  defaultValue,
  inputValue,
  components,
}) => {
  const handleChange = (newValue: SelectedOption) => {
    if (isMulti) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      onChange((newValue as Option[]) || []);
    } else {
      onChange(newValue as Option);
    }
  };

  const { colorBackground, colorPrimary } = variables;

  return (
    <div className="input-container">
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
      <div className="select-box">
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: colorPrimary,
              primary25: colorBackground,
              primary50: colorBackground,
            },
          })}
          name={name}
          options={options}
          inputId={id}
          onChange={handleChange}
          placeholder={placeholder}
          classNamePrefix="select-box"
          hideSelectedOptions={false}
          onInputChange={onInputChange}
          closeMenuOnSelect={closeMenuOnSelect}
          isMulti={isMulti}
          className={className}
          inputValue={inputValue}
          menuPlacement="auto"
          defaultValue={defaultValue}
          isSearchable={isSearchable}
          components={components}
        />
      </div>
    </div>
  );
};
export default SelectBox;
