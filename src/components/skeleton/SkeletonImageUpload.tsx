const SkeletonImageUpload = () => (
  <div className="cart">
    <fieldset className="fieldset ">
      <legend className="visually-hidden">
        Produkt billeder (Maksimalt 5)
      </legend>
      <div>
        <div className="upload-img-container">
          <ul className="img-list">
            <li className="img-list-item ">
              <img
                className="img-list-img"
                alt=""
                width="400"
                height="600"
                loading="lazy"
                fetchPriority="auto"
                src="/images/uploads/images-1757415424103.jpg"
              />
            </li>
          </ul>
          <div>
            <label
              htmlFor="images"
              className="file-upload-label btn btn-primary"
            >
              Tilføj produkt billeder
            </label>
          </div>
        </div>
        <span className="input-info">
          <span>
            Tilladte filer JPG, JPEG, PNG, WEBP, AVIF | Maksimal filstørrelse
            1MB
          </span>
        </span>
      </div>
    </fieldset>
  </div>
);

export default SkeletonImageUpload;
