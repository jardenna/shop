import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '../../../../components/Button';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../../components/fieldset/FieldSet';
import RadioButtonList from '../../../../components/formElements/RadioButtonList';
import Textarea from '../../../../components/formElements/Textarea';
import useMessagePopup from '../../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../../hooks/useFormValidation';
import { BtnType, IconName } from '../../../../types/enums';
import type { ChangeInputType } from '../../../../types/types';
import handleApiError from '../../../../utils/handleApiError';
import { createRatingList } from '../../../../utils/productLists';
import useLanguage from '../../../language/useLanguage';
import {
  useCheckReviewedQuery,
  usePostReviewsMutation,
} from '../../shopApiSlice';
import './_reviews.scss';

type ReviewsFormProps = {
  productId: string;
  initialRating?: number;
  totalStars?: number;
  onReset: () => void;
};

const ReviewsForm = ({
  totalStars = 5,
  initialRating = 0,
  productId,
  onReset,
}: ReviewsFormProps) => {
  const { language } = useLanguage();

  const [visible, setVisible] = useState<string | null>(null);
  const initialState = {
    rating: initialRating,
    comment: '',
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
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }

    setVisible(null);
  }

  const handleChange = (event: ChangeInputType) => {
    onChange(event);
    setVisible('visible');
  };

  return (
    !hasReviewed?.reviewed && (
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="review-form"
        >
          <FieldSet legendText={language.rateProduct}>
            <RadioButtonList
              name="rating"
              radioButtonList={createRatingList(totalStars)}
              initialChecked={String(values.rating)}
              onChange={handleChange}
              className="reviews"
              iconName={IconName.Star}
            />
          </FieldSet>

          {visible && (
            <div className={`review-textbox ${visible ? 'visible' : ''}`}>
              <FieldSet legendText={language.describeProduct}>
                <Textarea
                  ariaHidden={!visible}
                  value={values.comment}
                  name="comment"
                  id="comment"
                  labelText={language.shareYourExperience}
                  onChange={onChangeTextArea}
                  rows={8}
                />
              </FieldSet>
              <Button type={BtnType.Submit} disabled={isLoading}>
                {language.shareReview}
              </Button>
            </div>
          )}
        </form>
      </ErrorBoundary>
    )
  );
};

export default ReviewsForm;
