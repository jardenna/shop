import { useState } from 'react';
import './_size.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <ul className="product-size-list">
      {sizes.map((size) => (
        <li key={size} className="product-size-item">
          <label
            htmlFor={size}
            className={`product-size ${
              selectedSize === size ? 'selected' : ''
            }`}
          >
            {size}
          </label>

          <input
            type="radio"
            name="size"
            id={size}
            value={size}
            checked={selectedSize === size}
            onChange={() => {
              setSelectedSize(size);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
export default SizeSelector;
