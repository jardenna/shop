import type {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';
import Select from 'react-select';
import useLanguage from '../../features/language/useLanguage';
import type { OptionType, RefElementType } from '../../types/types';
import FormLabel from '../formElements/FormLabel';
import './_select-box.scss';

type SelectedOption = SingleValue<OptionType> | MultiValue<OptionType>;

type SelectboxProps = {
  id: string;
  labelText: string;
  name: string;
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  closeMenuOnSelect?: boolean;
  components?: any;
  defaultValue?: OptionType | OptionType[];
  errorText?: string;
  inputHasNoLabel?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isFixed?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  isOptionDisabled?: any;
  isSearchable?: boolean;
  menuIsOpen?: boolean;
  ref?: RefElementType;
  required?: boolean;
  selectKey?: string;
  onChange: (value: any) => void;
};

const Selectbox = ({
  options,
  isMulti,
  onChange,
  defaultValue,
  id,
  isSearchable = false,
  required,
  menuIsOpen,
  name,
  isDisabled,
  closeMenuOnSelect,
  labelText,
  errorText,
  inputHasNoLabel,
  ref,
  selectKey,
  components,
  isFixed = true,
  isLoading,
  isClearable,
  isOptionDisabled,
}: SelectboxProps) => {
  const { language } = useLanguage();
  const handleChange = (newValue: SelectedOption) => {
    if (isMulti) {
      onChange(newValue as OptionType[]);
    } else {
      onChange(newValue as OptionType);
    }
  };

  const closeMenuOnScroll = () => {
    if (ref) {
      return true;
    } else {
      return false;
    }
  };
  const ariaErrorId = `${id}-error`;

  return (
    <div className="input-container select-box-container">
      <FormLabel
        errorText={errorText}
        required={required}
        labelText={labelText}
        ariaErrorId={ariaErrorId}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />

      <div className="select-box">
        <Select
          isLoading={isLoading}
          isClearable={isClearable}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          menuPosition={isFixed ? 'fixed' : 'absolute'}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary50: '#DCE4E7',
            },
          })}
          aria-errormessage={errorText ? ariaErrorId : undefined}
          classNamePrefix="select-box"
          closeMenuOnScroll={closeMenuOnScroll}
          isMulti={isMulti}
          options={options}
          aria-invalid={errorText ? true : undefined}
          onChange={handleChange}
          defaultValue={defaultValue}
          inputId={id}
          name={name}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          menuPlacement="auto"
          closeMenuOnSelect={closeMenuOnSelect}
          placeholder=""
          noOptionsMessage={() => language.noOptions}
          components={components}
          menuIsOpen={menuIsOpen}
          isOptionDisabled={isOptionDisabled}
          key={selectKey}
        />
      </div>
    </div>
  );
};

export default Selectbox;
