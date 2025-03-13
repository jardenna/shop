import { FC, useState } from 'react';
import Selectbox from './SelectBox';

export type OptionType = {
  label: string;
  value: number | string;
};

const SelectTest: FC = () => {
  const options = [
    { label: 'apple', value: 1 },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
  ];

  const [items, setItems] = useState<OptionType[] | OptionType>();

  const handleOption = (selections: any) => {
    setItems(selections);
  };
  console.log(items);

  return (
    <section>
      <Selectbox
        isMulti
        name="fruits"
        options={options}
        onChange={(selections) => {
          handleOption(selections);
        }}
        defaultValue={{ label: 'kiwi', value: 3 }}
        id="fruits"
        labelText="Select Fruits"
      />
    </section>
  );
};

export default SelectTest;
