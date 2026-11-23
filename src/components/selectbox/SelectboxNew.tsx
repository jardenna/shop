import Select, { type GroupBase, type Props } from 'react-select';

interface SelectboxNewProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Props<Option, IsMulti, Group> {
  label?: string;
}

function SelectboxNew<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ label, ...props }: SelectboxNewProps<Option, IsMulti, Group>) {
  return (
    <div className="select-field">
      {label && <label>{label}</label>}

      <Select<Option, IsMulti, Group> {...props} />
    </div>
  );
}

export default SelectboxNew;
