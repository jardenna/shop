import { FC } from 'react';
import './_skeleton.scss';

export type SkeletonType = 'primary' | 'secondary' | 'img';

export interface SkeletonProps {
  className?: string;
  count?: number;
  height?: number;
  variant?: SkeletonType;
  width?: number;
}

const Skeleton: FC<SkeletonProps> = ({
  className = '',
  height,
  width,
  count,
  variant = 'primary',
}) =>
  !count ? (
    <span
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className={`skeleton skeleton-${variant}  ${className}`}
    />
  ) : (
    Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        style={{ height: `${height}rem` }}
        className={`skeleton skeleton-${variant} ${className}`}
      />
    ))
  );

export default Skeleton;
