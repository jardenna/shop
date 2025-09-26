import './_skeleton.scss';

export type SkeletonProps = {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
};

export type PickedSkeletonTypes = Pick<
  SkeletonProps,
  'count' | 'height' | 'width'
>;

const Skeleton = ({
  className = '',
  height = '',
  width = '',
  count,
}: SkeletonProps) =>
  !count ? (
    <span
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className={`skeleton   ${className}`}
    />
  ) : (
    Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        style={{ height: `${height}rem`, width: `${width}rem` }}
        className={`skeleton  ${className}`}
      />
    ))
  );

export default Skeleton;
