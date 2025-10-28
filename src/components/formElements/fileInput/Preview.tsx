import { BaseImageUploadProps } from '../../../features/products/components/ImageUpload';
import ImgListItem from './ImgListItem';

export type PreviewImg = {
  file: File;
  name: string;
  size: string;
  url: string;
  reason?: string;
};

type PreviewProps = BaseImageUploadProps & {
  ariaLabel: string;
};

const Preview = ({
  removePreviewImage,
  ariaLabel,
  previewData,
}: PreviewProps) => (
  <ul className="img-list preview-list">
    {previewData.map(({ url, reason, file }) => (
      <div key={url}>
        <ImgListItem
          onClick={() => {
            removePreviewImage(file.lastModified);
          }}
          img={url}
          reason={reason}
          ariaLabel={ariaLabel}
        />
      </div>
    ))}
  </ul>
);

export default Preview;
