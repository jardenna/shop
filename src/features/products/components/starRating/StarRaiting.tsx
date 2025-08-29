import { useState } from 'react';
import './_reviews.scss';

type StarRatingProps = {
  name: string;
  value: any;
  initialRating?: number;
  totalStars?: number;
  onChange?: (value: number) => void;
};

const StarRating = ({
  totalStars = 5,
  name,
  onChange,
  initialRating = 0,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleChange = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className="star-rating" role="radiogroup" aria-label="Rating">
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
    </div>
  );
};

export default StarRating;
