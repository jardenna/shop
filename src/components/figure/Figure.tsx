import { FC, ReactNode } from 'react';
import './_figure.scss';

interface FigureProps {
  alt: string;
  src: string;
  className?: string;
  figcaption?: string | ReactNode;
}

const Figure: FC<FigureProps> = ({ figcaption, src, alt, className = '' }) => (
  <figure className={className}>
    {figcaption && <figcaption>{figcaption}</figcaption>}
    <img className="figure-img" src={src} alt={alt} loading="lazy" />
  </figure>
);

export default Figure;
