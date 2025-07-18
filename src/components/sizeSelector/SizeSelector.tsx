import { useState } from 'react';
import './_size.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <fieldset className="size-selector">
      <legend>Vælg størrelse</legend>
      <ul className="size-options">
        {sizes.map((size) => {
          const id = `size-${size}`;
          return (
            <li key={size} className="size-option-wrapper">
              <label
                htmlFor={id}
                className={`size-label ${
                  selectedSize === size ? 'selected' : ''
                }`}
              >
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

                {size}
              </label>
            </li>
          );
        })}
      </ul>
      {selectedSize && <p>Valgt: {selectedSize}</p>}
    </fieldset>
  );
}
