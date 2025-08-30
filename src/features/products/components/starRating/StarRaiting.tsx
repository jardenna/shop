import './_reviews.scss';

type StarRatingProps = {
  name: string;
  value: number;
  initialRating?: number;
  totalStars?: number;
  onChange: (value: number) => void;
};

const StarRating = ({
  totalStars = 5,
  name,
  onChange,
  value,
}: StarRatingProps) => (
  <div className="star-rating" aria-label="Rating">
    {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => (
      <label key={star} className="star">
        <input
          type="radio"
          name={name}
          value={star}
          checked={star === value}
          onChange={() => {
            onChange(star);
          }}
        />
        <span className={`star-icon ${star <= value ? 'filled' : ''}`}>★</span>
      </label>
    ))}
  </div>
);

export default StarRating;
