import VisuallyHidden from '../../../../components/VisuallyHidden';
import './_reviews.scss';

type ReviewsProps = {
  rating: number;
};

const Reviews = ({ rating }: ReviewsProps) => {
  const stars = Array.from(
    { length: 5 },
    (_, index) => index < Math.round(rating),
  );

  return (
    <div className="review">
      <VisuallyHidden>Rating: {rating} out of 5 stars</VisuallyHidden>
      {stars.map((isFilled, index) => (
        <span
          key={index}
          className={isFilled ? 'star filled' : 'star'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Reviews;
