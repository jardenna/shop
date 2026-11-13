import { IconName } from '../../types/enums';
import { InputChangeHandler } from '../../types/types';
import Icon from '../icons/Icon';
import Input from './Input';

interface SearchProps {
  ariaLabel: string;
  id: string;
  labelText: string;
  name: string;
  onChange: InputChangeHandler;
  value: string;
}

const Search = ({
  labelText,
  onChange,
  value,
  name,
  id,
  ariaLabel,
}: SearchProps) => (
  <search aria-label={ariaLabel}>
    <Input
      onChange={onChange}
      value={value}
      id={id}
      name={name}
      inputMode="search"
      type="search"
      labelText={labelText}
      inputSuffix={<Icon iconName={IconName.Search} />}
      inputHasNoLabel
    />
  </search>
);

export default Search;
