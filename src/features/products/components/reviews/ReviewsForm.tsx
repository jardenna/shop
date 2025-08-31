import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import FieldSet from '../../../../components/fieldset/FieldSet';
import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import Textarea from '../../../../components/formElements/Textarea';
import useMessagePopup from '../../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../../hooks/useFormValidation';
import { BtnType, IconName } from '../../../../types/enums';
import type { ChangeInputType } from '../../../../types/types';
import { optionsList } from '../../../../utils/utils';
import useLanguage from '../../../language/useLanguage';
import { usePostReviewsMutation } from '../../../shop/shopApiSlice';
import './_reviews.scss';

type ReviewsFormProps = {
  productId: string;
  initialRating?: number;
  totalStars?: number;
};

const ReviewsForm = ({
  totalStars = 5,
  initialRating = 1,
  productId,
}: ReviewsFormProps) => {
  const { language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [visible, setVisible] = useState('');
  const initialState = {
    rating: initialRating,
    comment: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const [createReview, { isLoading }] = usePostReviewsMutation();

  // Submit handler
  async function handleSubmit() {
    try {
      await createReview({
        productId,
        reviews: values,
      }).unwrap();
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
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
    <form onSubmit={onSubmit} className="review-form">
      <FieldSet legendText={language.rateProduct}>
        <ControlList
          name="rating"
          options={optionsList(totalStars)}
          type="radio"
          initialChecked={String(values.rating)}
          onChange={handleChange}
          className="reviews"
          iconName={IconName.Star}
          values={[String(values.rating)]}
          variant="small"
        />
      </FieldSet>
      <div
        className={`review-textbox ${visible}`}
        aria-hidden={visible === '' ? true : undefined}
      >
        <Textarea
          tabIndex={visible === '' ? -1 : undefined}
          value={values.comment}
          ref={textareaRef}
          name="comment"
          id="comment"
          labelText={language.shareYourExperience}
          onChange={onChange}
          rows={8}
        />
        <Button
          type={BtnType.Submit}
          disabled={isLoading}
          tabIndex={visible === '' ? -1 : undefined}
        >
          {language.shareReview}
        </Button>
      </div>
    </form>
  );
};

export default ReviewsForm;
