import { IconName } from '../types/enums';
import type { InputChangeHandler } from '../types/types';
import CheckboxList from './formElements/checkbox/CheckboxList';

type TagListProps = {
  name: string;
  onChange: InputChangeHandler;
  values: string[];
  language?: Record<string, string>;
};
const TagList = ({ language, values, onChange, name }: TagListProps) => (
  <CheckboxList
    className="tag-list"
    language={language}
    checkBoxList={values}
    name={name}
    onChange={onChange}
    values={values}
    iconName={IconName.Close}
    ariaLabel={language?.removeFilter}
  />
);

export default TagList;
