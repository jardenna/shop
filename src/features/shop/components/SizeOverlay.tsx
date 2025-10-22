import { sliceAndCountHidden } from '../../../utils/utils';
import AdditionalCountBadge from './productLists/AdditionalCountBadge';

type SizeOverlayProps = {
  sizes: string[];
  count?: number;
};

const SizeOverlay = ({ sizes, count }: SizeOverlayProps) => {
  // Calculate how many sizes to show and how many are hidden
  const { visibleItems, additionalOptionsCount } = sliceAndCountHidden(
    sizes,
    count ?? sizes.length,
  );

  return (
    <ul className="size-overlay">
      {visibleItems.map((size) => (
        <li key={size}>{size}</li>
      ))}
      {additionalOptionsCount > 0 && (
        <li>
          <AdditionalCountBadge count={additionalOptionsCount} />
        </li>
      )}
    </ul>
  );
};

export default SizeOverlay;
