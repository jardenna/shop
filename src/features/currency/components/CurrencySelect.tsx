import { FC, useState } from 'react';
import Select from 'react-select';

const CurrencySelect: FC = () => {
  const options = [
    { label: 'apple', value: 1 },
    { label: 'orange', value: 2 },
    { label: 'kiwi', value: 3 },
  ];

  const [items, setItems] = useState();

  const handleOption = (selections: any) => {
    setItems(selections);
  };
  console.log(items);

  return (
    <section>
      <Select
        isMulti
        options={options}
        onChange={handleOption}
        defaultValue={{ label: 'kiwi', value: 3 }}
      />
    </section>
  );
};

export default CurrencySelect;
