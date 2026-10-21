import Skeleton, { SkeletonProps } from './Skeleton';

interface SkeletonInputProps extends SkeletonProps {
  inputHeight?: string;
  labelWidth?: string;
}

const SkeletonInput = ({
  className = '',
  inputHeight = '4',
  labelWidth = '14',
}: SkeletonInputProps) => (
  <div className={`skeleton-input skeleton-column ${className}`}>
    <Skeleton height="1" width={labelWidth} />
    <Skeleton height={inputHeight} />
  </div>
);

export default SkeletonInput;
