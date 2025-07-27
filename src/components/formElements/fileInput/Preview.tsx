import type { PreviewImg } from '../../../hooks/useFormValidation';
import ProductImgList from './ImgList';

export type PreviewProps = {
  ariaLabel: string;
  previewData: PreviewImg[];
  title: string;
  onRemoveImg: (name: string) => void;
};

const Preview = ({
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
}: PreviewProps) => (
  <ul className="preview-img-container">
    {previewData.map((preview, index) => (
      <ProductImgList
        key={index}
        onClick={() => {
          onRemoveImg(preview.name);
        }}
        img={preview.url}
        ariaLabel={`${ariaLabel} ${preview.name}`}
        title={title}
      />
    ))}
  </ul>
);

export default Preview;
