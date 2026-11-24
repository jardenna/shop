import { components, type OptionProps } from 'react-select';

interface MultiCustomOptionProps<Option> extends OptionProps<Option, true> {
  render: (data: Option) => React.ReactNode;
}

function MultiCustomOption<Option>({
  render,
  ...props
}: MultiCustomOptionProps<Option>) {
  return <components.Option {...props}>{render(props.data)}</components.Option>;
}

export default MultiCustomOption;
