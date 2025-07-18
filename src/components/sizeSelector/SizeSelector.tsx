import { useState } from 'react';
import FormLabel from '../formElements/FormLabel';
import './_size.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="checkbox-radio-container">
      <ul>
        {sizes.map((size) => {
          const id = `size-${size}`;
          return (
            <li key={size} className="size-option-wrapper">
              <FormLabel
                labelText={size}
                id={id}
                className={`size-label ${
                  selectedSize === size ? 'selected' : ''
                }`}
              />

              <input
                type="radio"
                name="size"
                id={id}
                value={size}
                checked={selectedSize === size}
                onChange={() => {
                  setSelectedSize(size);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SizeSelector;
