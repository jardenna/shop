import { ReactNode } from 'react';
import Picture from '../Picture';
import './_image-text-grid.scss';

interface ImageTextGridProps {
  alt: string;
  children: ReactNode;
  heading: string;
  src: string;
}

const ImageTextGrid = ({ children, src, alt, heading }: ImageTextGridProps) => (
  <section className="image-text-grid">
    <div className="text">
      <h2>{heading}</h2>
      {children}
    </div>
    <div className="image">
      <Picture src={`${src}.jpg`} srcSet={src} alt={alt} />
    </div>
  </section>
);

export default ImageTextGrid;
