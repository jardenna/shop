import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import FieldSet from '../../../../components/fieldset/FieldSet';
import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import Textarea from '../../../../components/formElements/Textarea';
import useMessagePopup from '../../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../../hooks/useFormValidation';
import { BtnType, IconName } from '../../../../types/enums';
import type { AriaLabelData, ChangeInputType } from '../../../../types/types';
import { optionsList } from '../../../../utils/utils';
import useLanguage from '../../../language/useLanguage';
import {
  useCheckReviewedQuery,
  usePostReviewsMutation,
} from '../../../shop/shopApiSlice';
import './_reviews.scss';

type ReviewsFormProps = {
  productId: string;
  initialRating?: number;
  totalStars?: number;
};

const ReviewsForm = ({
  totalStars = 5,
  initialRating = 0,
  productId,
}: ReviewsFormProps) => {
  const { language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [visible, setVisible] = useState<string | null>(null);
  const initialState = {
    rating: initialRating,
    comment: '',
  };

  const starAriaLabels = [
    language.rating1,
    language.rating2,
    language.rating3,
    language.rating4,
    language.rating5,
  ];

  const starAriaLabelData: AriaLabelData = {
    ariaLabels: starAriaLabels,
    unit: language.stars,
  };

  const { values, onChange, onChangeTextArea, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const [createReview, { isLoading }] = usePostReviewsMutation();
  const { data: hasReviewed } = useCheckReviewedQuery(productId);

  // Submit handler
  async function handleSubmit() {
    try {
      await createReview({
        productId,
        reviews: values,
      }).unwrap();
      setVisible(null);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
      setVisible(null);
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
    !hasReviewed?.reviewed && (
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
            ariaLabelData={starAriaLabelData}
          />
        </FieldSet>
        <div className={`review-textbox ${visible ? 'visible' : ''}`}>
          <Textarea
            tabIndex={visible === '' ? -1 : undefined}
            ariaHidden={visible === '' ? true : undefined}
            value={values.comment}
            ref={textareaRef}
            name="comment"
            id="comment"
            labelText={language.shareYourExperience}
            onChange={onChangeTextArea}
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
    )
  );
};

export default ReviewsForm;
