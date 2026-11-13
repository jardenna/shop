import { ratingList } from '../../../../app/api/apiConstants';
import CheckboxList from '../../../../components/formElements/checkbox/CheckboxList';
import { IconName } from '../../../../types/enums';
import { InputChangeHandler, Language } from '../../../../types/types';
import './_review-rating-list.scss';

interface ReviewRatingListProps {
  language: Language;
  onChange: InputChangeHandler;
  values: string[];
}

const ReviewRatingList = ({
  onChange,
  language,
  values,
}: ReviewRatingListProps) => (
  <CheckboxList
    checkBoxList={ratingList}
    name="rating"
    onChange={onChange}
    values={values}
    language={language}
    iconName={IconName.Star}
    className="rating-list"
    showControlInfo
  />
);
export default ReviewRatingList;
