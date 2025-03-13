import { FC, useState } from 'react';
import NewSelectBox from './NewSelectBox';

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
      <NewSelectBox
        isMulti
        options={options}
        onChange={handleOption}
        defaultValue={{ label: 'kiwi', value: 3 }}
        id="fruits"
      />
    </section>
  );
};

export default SelectTest;
