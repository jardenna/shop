import { ReviewsCountResponse } from '../../../app/api/apiTypes/adminReviewApiTypes';
import Button from '../../../components/Button';
import Chip from '../../../components/chips/Chip';
import { chipVariants } from '../../../components/chips/chipsUtils';
import LayoutElement from '../../../layout/LayoutElement';
import MetaTags from '../../../layout/MetaTags';
import { BtnVariant } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface AdminReviewHeaderProps {
  ariaLabelledby: string;
  isReadAllReviewLoading: boolean;
  unreadCount: ReviewsCountResponse;
  onReadAllReviews: () => void;
}

const AdminReviewHeader = ({
  unreadCount,
  ariaLabelledby,
  isReadAllReviewLoading,
  onReadAllReviews,
}: AdminReviewHeaderProps) => {
  const { language } = useLanguage();

  const heading = language.reviews;

  return (
    <LayoutElement className="page-header" ariaLabel={language.page}>
      <MetaTags metaTitle={heading} />
      <div className="admin-page-heading">
        <h1 id={ariaLabelledby}>{heading}</h1>
        {unreadCount.unreadCount > 0 && (
          <span aria-live="polite" aria-atomic="true">
            <Chip
              chipText={`${unreadCount.unreadCount} ${unreadCount.unreadCount > 1 ? language.unreadPlur : language.unread}`}
              variant={chipVariants.read}
            />
          </span>
        )}
      </div>
      <Button
        onClick={onReadAllReviews}
        showBtnLoader={isReadAllReviewLoading}
        disabled={unreadCount.unreadCount === 0}
        variant={BtnVariant.Secondary}
      >
        {language.markAllAsRead}
      </Button>
    </LayoutElement>
  );
};

export default AdminReviewHeader;
