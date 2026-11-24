import Select, {
  type GroupBase,
  type OptionsOrGroups,
  type Props,
} from 'react-select';
import type { RefElementType } from '../../shared/types';
import FormLabel from '../formElements/FormLabel';

interface SelectboxNewProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Props<Option, IsMulti, Group> {
  id: string;
  labelText: string;
  onChange: NonNullable<Props<Option, IsMulti, Group>['onChange']>;
  options: OptionsOrGroups<Option, Group>;
  errorText?: string;
  inputHasNoLabel?: boolean;
  isFixed?: boolean;
  ref?: RefElementType;
  required?: boolean;
  variant?: 'secondary';
}

const SelectboxNew = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  isFixed = true,
  id,
  variant,
  errorText,
  inputHasNoLabel,
  required,
  labelText,
  ref,
  ...props
}: SelectboxNewProps<Option, IsMulti, Group>) => {
  const ariaErrorId = `${id}-error`;

  const closeMenuOnScroll = () => {
    if (ref) {
      return true;
    } else {
      return false;
    }
  };

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
        <Select
          {...props}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          classNamePrefix="select-box"
          menuPosition={isFixed ? 'fixed' : 'absolute'}
          menuPlacement="auto"
          inputId={id}
          aria-errormessage={errorText ? ariaErrorId : undefined}
          aria-invalid={errorText ? true : undefined}
          closeMenuOnScroll={closeMenuOnScroll}
        />
      </div>
    </div>
  );
};
export default SelectboxNew;
