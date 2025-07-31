import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import {
  OptionGroupHeading,
  ProductListChoiceProps,
} from '../../../types/types';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import ControlInputField from './ControlInputField';

type RadioBtnListProps = ProductListChoiceProps & {
  availableSizeList: Size[];
  displaySizeList: Size[];
  initialChecked: string;
  groupTitle?: OptionGroupHeading;
  required?: boolean;
};

const RadioBtnList = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  availableSizeList,

  required,
  displaySizeList,
}: RadioBtnListProps) => (
  <section>
    <OptionGroupTitle groupTitle={groupTitle} required={required} />

    <ul className="checkbox-list">
      {displaySizeList.map((size) => (
        <ControlInputField
          key={size}
          type="radio"
          name={name}
          id={size}
          value={size}
          checked={initialChecked === size}
          onChange={onChange}
          disabled={!availableSizeList.includes(size)}
          label={size}
        />
      ))}
    </ul>
  </section>
);

export default RadioBtnList;
