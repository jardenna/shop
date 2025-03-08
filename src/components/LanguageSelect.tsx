import { FC } from 'react';
import { HeaderProps } from '../layout/header/Header';
import SelectBox from './selectBox/SelectBox';

type OmittedHeaderProps = Omit<HeaderProps, 'ariaLabel'>;

const LanguageSelect: FC<OmittedHeaderProps> = ({
  onLanguageChange,
  defaultValue,
  options,
  labelText,
}) => (
  <form>
    <SelectBox
      name="language"
      options={options}
      id="language"
      onChange={onLanguageChange}
      labelText={labelText}
      inputHasNoLabel
      defaultValue={defaultValue}
    />
  </form>
);

export default LanguageSelect;
