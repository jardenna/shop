import { useState } from 'react';
import { MultiValue } from 'react-select';
import Selectbox, { OptionType } from './Selectbox';

type MultiSelectboxProps = {
  id: string;
  labelText: string;
  name: string;
  options: MultiValue<OptionType>;
  defaultValue?: OptionType;
  isSearchable?: boolean;
};

const MultiSelectbox = ({
  id,
  name,
  labelText,
  options,
  defaultValue,
  isSearchable,
}: MultiSelectboxProps) => {
  const [, setItems] = useState<OptionType[] | OptionType>();

  const handleOption = (selections: any) => {
    setItems(selections);
  };

  return (
    <section>
      <Selectbox
        isMulti
        closeMenuOnSelect={false}
        isSearchable={isSearchable}
        name={name}
        options={options}
        onChange={(selections) => {
          handleOption(selections);
        }}
        defaultValue={defaultValue || null}
        id={id}
        labelText={labelText}
      />
    </section>
  );
};

export default MultiSelectbox;
