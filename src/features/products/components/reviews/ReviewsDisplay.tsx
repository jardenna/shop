import { DisplyReviews } from '../../../../app/api/apiTypes/shopApiTypes';
import Icon from '../../../../components/icons/Icon';
import { IconName } from '../../../../types/enums';
import './_reviews.scss';
type ReviewsDisplayProps = {
  numOfReviews: number;
  rating: number;
  reviews: DisplyReviews[];
};

const ReviewsDisplay = ({
  rating,
  reviews,
  numOfReviews,
}: ReviewsDisplayProps) => {
  const stars = [0, 1, 2, 3, 4].map((i) => {
    if (i + 1 <= rating) {
      return 'full';
    }
    if (i < rating) {
      return 'half';
    }
    return 'empty';
  });

  return (
    <article>
      <section className="review-display">
        <div className="stars">
          {stars.map((type, index) => (
            <span key={index} className="star" aria-hidden="true">
              {type === 'full' && (
                <Icon iconName={IconName.Star} title={type} />
              )}
              {type === 'half' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Left half */}
                  <path
                    d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
                    fill="currentColor"
                  />
                  {/* Right half (mirrored horizontally) */}
                  <path
                    d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
                    fill="currentColor"
                    transform="scale(-1,1) translate(-24,0)"
                  />
                </svg>
              )}
              {type === 'empty' && (
                <Icon iconName={IconName.Star} title={type} />
              )}
            </span>
          ))}
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Left half */}
            <path
              d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
              fill="currentColor"
            />
            {/* Right half (mirrored horizontally) */}
            <path
              d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
              fill="currentColor"
              transform="scale(-1,1) translate(-24,0)"
            />
          </svg>
        </span>

        <span>{rating}</span>
        <span>{numOfReviews}</span>
      </section>
      {reviews.map((review, index) => (
        <div key={index}>
          {review.comment}
          <span>{review.rating}</span>
          <p>{review.name}</p>
        </div>
      ))}
    </article>
  );
};

export default ReviewsDisplay;
