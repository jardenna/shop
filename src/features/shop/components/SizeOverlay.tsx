import './SizeOverlay.styles.scss';

type SizeOverlayProps = {
  sizes: string[];
};

const SizeOverlay = ({ sizes }: SizeOverlayProps) => (
  <ul className="size-overlay">
    {sizes.map((size) => (
      <li key={size}>{size}</li>
    ))}
  </ul>
);

export default SizeOverlay;
