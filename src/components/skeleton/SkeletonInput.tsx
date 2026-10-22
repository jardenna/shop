import Skeleton, { SkeletonProps } from './Skeleton';

export interface SkeletonInputProps extends SkeletonProps {
  inputHeight?: string;
  labelWidth?: string;
}

const SkeletonInput = ({
  className = '',
  inputHeight = '4',
  labelWidth,
}: SkeletonInputProps) => (
  <span className={`skeleton-input skeleton-column ${className}`}>
    <Skeleton height="1" width={labelWidth} />
    <Skeleton height={inputHeight} />
  </span>
);

export default SkeletonInput;
