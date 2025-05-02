import { RefObject } from 'react';
import Select, {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';
import useLanguage from '../../features/language/useLanguage';
import FormError from '../formElements/FormError';
import FormLabel from '../formElements/FormLabel';
import './_select-box.scss';

export type OptionType = {
  label: string;
  value: number | string;
};
export type SelectedOption = SingleValue<OptionType> | MultiValue<OptionType>;
type SelectboxProps = {
  id: string;
  labelText: string;
  name: string;
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  closeMenuOnSelect?: boolean;
  components?: any;
  defaultValue?: OptionType;
  errorText?: string;
  inputHasNoLabel?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  isFixed?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  ref?: RefObject<HTMLFormElement | null>;
  required?: boolean;
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
  name,
  isDisabled,
  closeMenuOnSelect,
  labelText,
  errorText,
  inputHasNoLabel,
  ref,
  components,
  isFixed = true,
  isLoading,
  isClearable,
}: SelectboxProps) => {
  const { language } = useLanguage();
  const handleChange = (newValue: SelectedOption) => {
    if (isMulti) {
      onChange(newValue as OptionType);
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

  return (
    <div className="input-container">
      <span className={inputHasNoLabel ? '' : 'form-label-container'}>
        <FormLabel
          required={required}
          inputLabel={labelText}
          id={id}
          inputHasNoLabel={inputHasNoLabel}
        />
        {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
      </span>
      {errorText && (
        <span className="error-icon" aria-hidden="true">
          i
        </span>
      )}
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
          // menuIsOpen
        />
      </div>
    </div>
  );
};

export default Selectbox;
