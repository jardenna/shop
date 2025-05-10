const SkeletonPageList = () => (
  <div className="page-card">
    <span className="card-top-line" />
    <div className="flex">
      <div className="page-card skeleton-card">
        <div>img</div>
        <div>text badge</div>
        <div>footer</div>
      </div>
      <div className="page-card skeleton-card">Center</div>
      <div className="page-card skeleton-card">Right</div>
    </div>
  </div>
);

export default SkeletonPageList;
