const ImageBackground = () => <div className="picture">
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
    <div className="wrapper">
      <h1 className="test">Example text over image</h1>
    </div>
  </div>;
};

export default ImageBackground;
