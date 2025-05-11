const SkeletonPageList = () => (
  <div className="page-card">
    <span className="card-top-line" />
    <div className="flex">
      <div className="page-card flex-1">
        <div>img</div>
        <div>text badge</div>
        <div>footer</div>
      </div>
      <div className="page-card flex-1">Center</div>
      <div className="page-card flex-1" style={{ maxWidth: '25rem' }}>
        Right
      </div>
    </div>
  </div>
);

export default SkeletonPageList;
