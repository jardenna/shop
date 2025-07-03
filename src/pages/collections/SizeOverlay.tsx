import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';

type SizeOverlayProps = {
  sizes: ProductSizes[];
};

const SizeOverlay = ({ sizes }: SizeOverlayProps) => (
  <ul className="size-overlay">
    {sizes.map((size) => (
      <li key={size}>{size}</li>
    ))}
  </ul>
);

export default SizeOverlay;
