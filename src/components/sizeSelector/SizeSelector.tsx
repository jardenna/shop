import { useState } from 'react';
import './_size.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <ul>
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
              {size}
            </label>

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
  );
}
export default SizeSelector;
