import { FormEvent, useState } from 'react';

import ControlList from '../../../../components/formElements/controlGroup/ControlList';
import { IconName } from '../../../../types/enums';
import { ChangeInputType } from '../../../../types/types';
import { optionsList } from '../../../../utils/utils';
import './_reviews.scss';

interface StarRatingProps {
  name: string;
  initialRating?: number;
  totalStars?: number;
}

const StarRating = ({
  totalStars = 5,
  name,
  initialRating = 1,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleChange = (e: ChangeInputType) => {
    setRating(Number(e.target.value)); // value from ControlList is string
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Rating submitted:', rating);
  };

  return (
    <form className="star-rating" aria-label="Rating" onSubmit={handleSubmit}>
      <ControlList
        name={name}
        options={optionsList(totalStars)}
        type="radio"
        initialChecked={String(rating)}
        onChange={handleChange}
        className="star-rating"
        iconName={IconName.Star}
        values={[String(rating)]}
        variant="small"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default StarRating;
