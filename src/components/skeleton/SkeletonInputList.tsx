import SkeletonInput, { SkeletonInputProps } from './SkeletonInput';

const SkeletonInputList = ({
  count = 3,
  inputHeight = '4',
  labelWidth = '14',
}: SkeletonInputProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <span className="skeleton-input-container skeleton-column">
      {skeletons.map((_, index) => (
        <SkeletonInput
          key={index}
          inputHeight={inputHeight}
          labelWidth={labelWidth}
        />
      ))}
    </span>
  );
};

export default SkeletonInputList;
