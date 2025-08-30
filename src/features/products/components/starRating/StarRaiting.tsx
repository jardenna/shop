import Form from '../../../../components/form/Form';
import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import Textarea from '../../../../components/formElements/Textarea';
import useFormValidation from '../../../../hooks/useFormValidation';
import { IconName } from '../../../../types/enums';
import { optionsList } from '../../../../utils/utils';
import './_reviews.scss';

type StarRatingProps = {
  initialRating?: number;
  totalStars?: number;
};

const StarRating = ({ totalStars = 5, initialRating = 1 }: StarRatingProps) => {
  const initialState = {
    rating: initialRating,
    description: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    console.log('Rating submitted:', values);
  }

  return (
    <Form className="star-rating" onSubmit={onSubmit} submitBtnLabel="Rate">
      <ControlList
        name="rating"
        options={optionsList(totalStars)}
        type="radio"
        initialChecked={String(values.rating)}
        onChange={onChange}
        className="star-rating"
        iconName={IconName.Star}
        values={[String(values.rating)]}
        variant="small"
        groupTitle={{
          title: 'Rate product',
          id: 'rate-product',
        }}
      />

      <Textarea
        value={values.description}
        name="description"
        id="description"
        labelText="Fortæl os om din oplevelse"
        onChange={onChange}
      />
    </Form>
  );
};

export default StarRating;
