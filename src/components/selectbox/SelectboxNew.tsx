import type {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
  Props,
} from 'react-select';
import Select from 'react-select';
import type { RefElementType } from '../../shared/types';
import FormLabel from '../formElements/FormLabel';
import './_select-box.scss';

export type SelectChangeHandler<
  Option extends { value: string },
  IsMulti extends boolean = false,
> = (
  selected: OnChangeValue<Option, IsMulti>,
  actionMeta: ActionMeta<Option>,
) => void;

interface SelectboxNewProps<
  Option extends { value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<Props<Option, IsMulti, Group>, 'value' | 'onChange'> {
  id: string;
  labelText: string;
  onChange: SelectChangeHandler<Option, IsMulti>;
  options: OptionsOrGroups<Option, Group>;
  value: IsMulti extends true ? string[] : string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  isFixed?: boolean;
  placeHolder?: string;
  ref?: RefElementType;
  required?: boolean;
  selectKey?: string;
  variant?: 'secondary';
}

const SelectboxNew = <
  Option extends { value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isFixed = true,
  id,
  variant,
  selectKey,
  errorText,
  inputHasNoLabel,
  required,
  labelText,
  ref,
  options,
  value,
  isMulti,
  placeHolder = '',
  ...props
}: SelectboxNewProps<Option, IsMulti, Group>) => {
  const ariaErrorId = `${id}-error`;

  const flatOptions = options.flatMap((option) =>
    'options' in option ? option.options : [option],
  );

  const selectedValue = isMulti
    ? flatOptions.filter((option) => (value as string[]).includes(option.value))
    : (flatOptions.find((option) => option.value === value) ?? null);

  const closeMenuOnScroll = () => Boolean(ref);

  return (
    <div className={`input-container select-box-container ${variant ?? ''}`}>
      <FormLabel
        errorText={errorText}
        required={required}
        labelText={labelText}
        ariaErrorId={ariaErrorId}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />

      <div className="select-box">
        <Select<Option, IsMulti, Group>
          key={selectKey}
          {...props}
          isMulti={isMulti}
          options={options}
          value={selectedValue}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          classNamePrefix="select-box"
          menuPosition={isFixed ? 'fixed' : 'absolute'}
          menuPlacement="auto"
          inputId={id}
          aria-errormessage={errorText ? ariaErrorId : undefined}
          aria-invalid={errorText ? true : undefined}
          closeMenuOnScroll={closeMenuOnScroll}
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default SelectboxNew;
