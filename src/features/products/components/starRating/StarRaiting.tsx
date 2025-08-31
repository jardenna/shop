import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import FieldSet from '../../../../components/fieldset/FieldSet';
import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import Textarea from '../../../../components/formElements/Textarea';
import useFormValidation from '../../../../hooks/useFormValidation';
import { BtnType, IconName } from '../../../../types/enums';
import type { ChangeInputType } from '../../../../types/types';
import { optionsList } from '../../../../utils/utils';
import useLanguage from '../../../language/useLanguage';
import './_reviews.scss';

type StarRatingProps = {
  initialRating?: number;
  totalStars?: number;
};

const StarRating = ({ totalStars = 5, initialRating = 1 }: StarRatingProps) => {
  const { language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [visible, setVisible] = useState('');
  const initialState = {
    rating: initialRating,
    review: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    console.log('Rating submitted:', values);
  }

  const handleChange = (event: ChangeInputType) => {
    onChange(event);
    setVisible('visible');
  };

  useEffect(() => {
    if (visible === 'visible' && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [visible]);

  return (
    <form className="star-rating" onSubmit={onSubmit}>
      <FieldSet legendText={language.rateProduct}>
        <ControlList
          name="rating"
          options={optionsList(totalStars)}
          type="radio"
          initialChecked={String(values.rating)}
          onChange={handleChange}
          className="star-rating"
          iconName={IconName.Star}
          values={[String(values.rating)]}
          variant="small"
        />
      </FieldSet>
      <div className={`review-textbox ${visible}`}>
        <Textarea
          value={values.review}
          ref={textareaRef}
          name="review"
          id="review"
          labelText={language.shareYourExperience}
          onChange={onChange}
          rows={8}
        />
        <Button type={BtnType.Submit}>{language.shareReview}</Button>
      </div>
    </form>
  );
};

export default StarRating;
