import { IconName } from '../types/enums';
import { ChangeInputType } from '../types/types';
import CheckboxList from './formElements/checkbox/CheckboxList';
import IconContent from './IconContent';

type TagListProps = {
  ariaLabel: string;
  name: string;
  values: string[];
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
};
const TagList = ({
  language,
  values,
  onChange,
  name,
  ariaLabel,
}: TagListProps) => (
  <CheckboxList
    className="tag-list"
    language={language}
    checkBoxList={values}
    name={name}
    onChange={onChange}
    values={values}
  >
    <IconContent
      iconName={IconName.Close}
      title=""
      size="16"
      ariaLabel={ariaLabel}
    />
  </CheckboxList>
);

export default TagList;
