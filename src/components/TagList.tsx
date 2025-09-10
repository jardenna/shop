import { IconName } from '../types/enums';
import { ChangeInputType } from '../types/types';
import CheckboxList from './formElements/checkbox/CheckboxList';

type TagListProps = {
  name: string;
  values: string[];
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
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
    ariaLabel={language?.close}
  />
);

export default TagList;
