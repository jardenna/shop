import SkeletonAdminReviewCard from './SkeletonAdminReviewCard';

const SkeletonAdminReviewCardList = () => {
  const skeletons = Array.from({ length: 6 });
  return (
    <span className="admin-review-list cart">
      {skeletons.map((_, index) => (
        <SkeletonAdminReviewCard key={index} />
      ))}
    </span>
  );
};

export default SkeletonAdminReviewCardList;
