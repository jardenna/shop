import { FC, useState } from 'react';
import Selectbox, { OptionType } from './SelectBox';

const MultiSelectBox: FC = () => {
  const options = [
    { label: 'apple', value: 1 },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
  ];

  const [, setItems] = useState<OptionType[] | OptionType>();

  const handleOption = (selections: any) => {
    setItems(selections);
  };

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

export default MultiSelectBox;
