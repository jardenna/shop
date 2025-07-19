import { ChangeInputType } from '../../types/types';
import './_size.scss';

type SizeSelectortProps = {
  initialChecked: string;
  radioButtonList: string[];
  iconName?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeSelector = ({
  initialChecked,
  radioButtonList,
  onChange,
}: SizeSelectortProps) => (
  <ul className="product-size-list">
    {radioButtonList.map((size) => (
      <li key={size} className="product-size-item">
        <label htmlFor={size} className="product-size">
          {size}
        </label>

        <input
          type="radio"
          name="sizes"
          id={size}
          value={size}
          checked={initialChecked === size}
          onChange={onChange}
        />
      </li>
    ))}
  </ul>
);
export default SizeSelector;
