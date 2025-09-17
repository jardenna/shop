type PictureTypes = {
  fallbackImg: string;
  img: string;
};

const Picture = () => (
  <picture>
    <source
      srcSet="https://assets.codepen.io/429997/abstract_space.jpeg?width=896&height=539&format=avif"
      type="image/avif"
    />
    <img
      src="https://assets.codepen.io/429997/abstract_space.jpeg?width=896&height=539&format=auto"
      alt=""
      loading="lazy"
    />
  </picture>
);

export default Picture;
