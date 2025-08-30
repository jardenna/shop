import { useState } from 'react';
import { FormEventType } from '../../../../types/types';
import './_reviews.scss';

type StarRatingProps = {
  name: string;
  initialRating?: number;
  totalStars?: number;
};

const StarRating = ({
  totalStars = 5,
  name,
  initialRating = 1,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleChange = (value: number) => {
    setRating(value);
  };
  const handleSubmit = (e: FormEventType) => {
    e.preventDefault();
    console.log('Rating submitted:', rating);
  };

  return (
    <form className="star-rating" aria-label="Rating" onSubmit={handleSubmit}>
      {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => (
        <label key={star} className="star">
          <input
            type="radio"
            name={name}
            value={star}
            checked={star === rating}
            onChange={() => {
              handleChange(star);
            }}
          />
          <span className={`star-icon ${star <= rating ? 'filled' : ''}`}>
            ★
          </span>
        </label>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default StarRating;
