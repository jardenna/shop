import React, { useState } from 'react';
import { Size } from '../app/api/apiTypes/sharedApiTypes';

type CheckboxFormProps = {
  options: Size[];
};
const CheckboxForm = ({ options }: CheckboxFormProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Handle checkbox change
  const handleChange = (value: string) => {
    setCheckedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected items:', checkedItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      {options.map((label, index) => {
        const id = `${index}`;
        return (
          <div key={label}>
            <label htmlFor={id}>{label}</label>
            <input
              type="checkbox"
              id={id}
              value={label}
              checked={checkedItems.includes(label)}
              onChange={() => {
                handleChange(label);
              }}
            />
          </div>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckboxForm;
