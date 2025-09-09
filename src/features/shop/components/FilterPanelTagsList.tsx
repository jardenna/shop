import Button from '../../../components/Button';
import IconContent from '../../../components/IconContent';
import { BtnVariant, IconName } from '../../../types/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';

type FilterPanelProps = {
  language: Record<string, string>;
  values: string[];
};

const FilterPanelTagsList = ({ values, language }: FilterPanelProps) => (
  <ul className="tag-list">
    {values.map((value) => (
      <li key={value} className="tag-item">
        <Button variant={BtnVariant.WidthIcon} key={value}>
          <span>{getlowerCaseFirstLetter(value, language)}</span>
          <IconContent
            iconName={IconName.Close}
            title=""
            size="16"
            ariaLabel={language.removeFilter}
          />
        </Button>
      </li>
    ))}
  </ul>
);

export default FilterPanelTagsList;
