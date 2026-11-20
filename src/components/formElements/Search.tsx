import type { InputChangeHandler } from '../../types/types';
import Icon from '../icons/Icon';
import Input from './Input';

interface SearchProps {
  ariaLabel: string;
  id: string;
  labelText: string;
  name: string;
  onChange: InputChangeHandler;
  value: string;
  inputHasNoLabel?: boolean;
}

const Search = ({
  labelText,
  onChange,
  value,
  name,
  id,
  ariaLabel,
  inputHasNoLabel,
}: SearchProps) => (
  <search aria-label={ariaLabel}>
    <Input
      variant="secondary"
      onChange={onChange}
      className="search-input"
      value={value}
      id={id}
      name={name}
      inputMode="search"
      type="search"
      labelText={labelText}
      inputSuffix={<Icon iconName="search" />}
      inputHasNoLabel={inputHasNoLabel}
    />
  </search>
);

export default Search;
