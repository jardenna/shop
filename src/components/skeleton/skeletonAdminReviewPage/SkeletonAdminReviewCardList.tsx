import SkeletonAdminReviewCard from './SkeletonAdminReviewCard';

const SkeletonAdminReviewCardList = () => {
  const skeletons = Array.from({ length: 6 });
  return (
    <div className="admin-review-list cart">
      {skeletons.map((_, index) => (
        <SkeletonAdminReviewCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonAdminReviewCardList;
