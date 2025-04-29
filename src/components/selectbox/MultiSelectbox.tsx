import { MultiValue } from 'react-select';
import Selectbox, { OptionType } from './Selectbox';

type MultiSelectboxProps = {
  id: string;
  labelText: string;
  name: string;
  onChange: any;
  options: MultiValue<OptionType>;
  defaultValue?: OptionType;
  isSearchable?: boolean;
};

const MultiSelectbox = ({
  id,
  name,
  labelText,
  options,
  defaultValue,
  isSearchable,
  onChange,
}: MultiSelectboxProps) => (
  <section>
    <Selectbox
      isMulti
      closeMenuOnSelect={false}
      isSearchable={isSearchable}
      name={name}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue || null}
      id={id}
      labelText={labelText}
    />
  </section>
);

export default MultiSelectbox;
