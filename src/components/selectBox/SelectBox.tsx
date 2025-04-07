import Select, {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';
import FormLabel from '../formElements/FormLabel';
import './_select-box.scss';

export type OptionType = {
  label: string;
  value: number | string;
};
export type SelectedOption = SingleValue<OptionType> | MultiValue<OptionType>;
type SelectBoxProps = {
  defaultValue: OptionType;
  id: string;
  labelText: string;
  name: string;
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  closeMenuOnSelect?: boolean;
  inputHasNoLabel?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange: (value: OptionType) => void;
};

const Selectbox = ({
  options,
  isMulti,
  onChange,
  defaultValue,
  id,
  isSearchable = false,
  required,
  placeholder,
  name,
  isDisabled,
  closeMenuOnSelect,
  labelText,
  inputHasNoLabel,
}: SelectBoxProps) => {
  const handleChange = (newValue: SelectedOption) => {
    if (isMulti) {
      onChange(newValue as OptionType);
    } else {
      onChange(newValue as OptionType);
    }
  };
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
              primary50: '#DCE4E7',
            },
          })}
          classNamePrefix="select-box"
          isMulti={isMulti}
          options={options}
          onChange={handleChange}
          defaultValue={defaultValue}
          inputId={id}
          name={name}
          isSearchable={isSearchable}
          placeholder={placeholder}
          isDisabled={isDisabled}
          closeMenuOnSelect={closeMenuOnSelect}
        />
      </div>
    </div>
  );
};

export default Selectbox;
