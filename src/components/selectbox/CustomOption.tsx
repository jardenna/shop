import { OptionProps } from 'react-select';

type CustomOptionProps<OptionType> = OptionProps<OptionType> & {
  render: (data: OptionType) => React.ReactNode;
};

const CustomOption = <OptionType,>({
  data,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
  render,
}: CustomOptionProps<OptionType>) => {
  const className = `custom-option ${
    isSelected ? 'selected' : ''
  } ${isFocused ? 'focused' : ''}`;

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      {render(data)}
    </div>
  );
};

export default CustomOption;
