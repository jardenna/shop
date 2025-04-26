type ImgProps = {
  alt: string;
  src: string;
  className?: string;
};

const Img = ({ className = '', src, alt }: ImgProps) => (
  <img className={className} src={`/images/${src}`} alt={alt} loading="lazy" />
);

export default Img;
