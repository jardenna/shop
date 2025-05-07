import { PreviewImg } from '../../../hooks/useFormValidation';
import ProductImgList from './ProductImgList';

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
  <ul className="preview-list">
    {previewData.map((preview, index) => (
      <ProductImgList
        key={index}
        onClick={() => {
          onRemoveImg(preview.name);
        }}
        img={preview.url}
        ariaLabel={`${ariaLabel} ${preview.name}`}
        title={title}
      >
        <div className="preview-info">
          <span className="text-ellipsis">{preview.name}</span>
          <span className="preview-size">{preview.size}</span>
        </div>
      </ProductImgList>
    ))}
  </ul>
);

export default Preview;
