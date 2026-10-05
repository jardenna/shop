import type { ReactNode } from 'react';
import { OptionProps } from 'react-select';

type CustomOptionProps<OptionTypeNew> = OptionProps<OptionTypeNew> & {
  render: (data: OptionTypeNew) => ReactNode;
};

const CustomOption = <OptionTypeNew,>({
  data,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
  render,
}: CustomOptionProps<OptionTypeNew>) => {
  const className = `select-box-menu-list-item  ${
    isSelected ? 'selected' : ''
  } ${isFocused ? 'focused' : ''}`;

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      {render(data)}
    </div>
  );
};

export default CustomOption;
