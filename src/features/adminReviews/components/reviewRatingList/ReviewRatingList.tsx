import FieldSet from '../../../../components/fieldset/FieldSet';
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
}: ReviewRatingListProps) => {
  const ratingList = ['1', '2', '3', '4', '5'];

  return (
    <FieldSet legendText={language.filterByStarRating}>
      <CheckboxList
        checkBoxList={ratingList}
        name="rating"
        onChange={onChange}
        values={values}
        language={language}
        iconName={IconName.Star}
        className="rating-list"
      />
    </FieldSet>
  );
};
export default ReviewRatingList;
