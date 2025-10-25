export type AspectRatio = '2:3' | '3:1' | '4:5' | '1:1' | '16:9';

// Common aspect ratios used across the shop
const RATIO_MAP: Record<AspectRatio, { height: number; width: number }> = {
  '2:3': { width: 400, height: 600 }, // thumbnails, product images, collection previews
  '3:1': { width: 1500, height: 500 }, // hero/banners in landscape
  '4:5': { width: 400, height: 500 }, // optional portrait (fashion standard)
  '1:1': { width: 400, height: 400 }, // brand logos, small square visuals
  '16:9': { width: 1600, height: 900 }, // legacy / video style hero
};

export type ImgProps = {
  alt: string;
  src: string;
  className?: string;
  priority?: boolean; // Only used for hero above the fold
  ratio?: AspectRatio;
};

const Img = ({
  className,
  src,
  alt,
  ratio = '2:3',
  priority = false,
}: ImgProps) => {
  const { width, height } = RATIO_MAP[ratio];

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      // Important: eager + high priority for hero, lazy for everything else
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};

export default Img;
