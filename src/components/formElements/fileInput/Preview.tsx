import { PreviewImg } from '../../../hooks/useFormValidation';
import ProductImgList from './ProductImgList';

export type PreviewProps = {
  ariaLabel: string;
  previewData: PreviewImg[];
  title: string;
  className?: string;
  onRemoveImg: (name: string) => void;
};

const Preview = ({
  onRemoveImg,
  ariaLabel,
  title,
  previewData,
  className = '',
}: PreviewProps) => (
  <ul className={`preview-list ${className}`}>
    {previewData.map((preview, index) => (
      <ProductImgList
        key={index}
        onClick={() => {
          onRemoveImg(preview.name);
        }}
        img={preview.url}
        ariaLabel={ariaLabel}
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
