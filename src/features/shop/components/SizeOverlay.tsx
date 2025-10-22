import { sliceAndCountHidden } from '../../../utils/utils';

type SizeOverlayProps = {
  sizes: string[];
  count?: number;
};

const SizeOverlay = ({ sizes, count }: SizeOverlayProps) => {
  // Calculate how many sizes to show and how many are hidden
  const shownSizeLength = count ? count : sizes.length;
  const { visibleItems, additionalColorsCount } = sliceAndCountHidden(
    sizes,
    shownSizeLength,
  );

  return (
    <ul className="size-overlay">
      {visibleItems.map((size) => (
        <li key={size}>{size}</li>
      ))}
      {additionalColorsCount > 0 && (
        <li className="additional-colors-badge">{`+ ${additionalColorsCount}`}</li>
      )}
    </ul>
  );
};

export default SizeOverlay;
