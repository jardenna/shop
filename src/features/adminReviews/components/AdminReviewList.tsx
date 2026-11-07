import { Link } from 'react-router';
import { AdminReviewsResponse } from '../../../app/api/apiTypes/adminReviewApiTypes';
import Chip from '../../../components/chips/Chip';
import { chipVariants } from '../../../components/chips/chipsUtils';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import IconBtn from '../../../components/IconBtn';
import Img from '../../../components/Img';
import ReviewStars from '../../../components/ReviewStars';
import { ShopPath } from '../../../layout/nav/enums';
import { BtnVariant, IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';
import './_admin-review.scss';

interface AdminReviewListProps {
  isReadReviewLoading: boolean;
  reviews: AdminReviewsResponse[];
  loadingReviewId?: string;
  onReadOneReview: (id: string) => void;
}

const AdminReviewList = ({
  reviews,
  onReadOneReview,
  isReadReviewLoading,
  loadingReviewId,
}: AdminReviewListProps) => {
  const { language } = useLanguage();

  return (
    <ul className="admin-review-list">
      {reviews.map((review) => (
        <li key={review.id} className="admin-review-cart">
          <article className="review-product-content">
            <Link to={`${ShopPath.AllProducts}/${review.productId}`}>
              <Img src={review.image} alt="" className="review-product-img" />
            </Link>
            <div className="review-product-info">
              <h2 className="review-product-name">{review.productName}</h2>
              <p>
                <span className="text-bold">{language.reviewedBy}:</span>{' '}
                {review.userName}
              </p>
              <p>
                <span className="text-bold">{language.totalRating}:</span>{' '}
                {review.rating}
              </p>
            </div>
          </article>
          <article className="review-info-content">
            <div className="review-info">
              <ReviewStars rating={review.rating} />
              <DateDisplay date={review.createdAt} month="2-digit" />
            </div>

            <p className="review-comment">{review.comment}</p>

            <div className="admin-review-footer">
              <IconBtn
                onClick={() => {
                  onReadOneReview(review.id);
                }}
                iconName={IconName.Check}
                ariaLabel={language.markAsRead}
                variant={BtnVariant.Secondary}
                showLabel
                disabled={review.isRead}
                isLoading={isReadReviewLoading && loadingReviewId === review.id}
              />
              <span aria-live="polite" aria-atomic="true">
                <Chip
                  chipText={review.isRead ? language.read : language.unread}
                  variant={
                    review.isRead ? chipVariants.read : chipVariants.unread
                  }
                />
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default AdminReviewList;
