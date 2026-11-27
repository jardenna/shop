import { Fragment } from 'react/jsx-runtime';
import type { BaseImageUploadProps } from '../../../features/products/components/ImageUpload';
import ImgListItem from './ImgListItem';

export interface PreviewImg {
  file: File;
  name: string;
  size: string;
  url: string;
  reason?: string;
}

interface PreviewProps extends BaseImageUploadProps {
  ariaLabel: string;
}

const Preview = ({
  removePreviewImage,
  ariaLabel,
  previewData,
}: PreviewProps) => (
  <ul className="img-list preview-list">
    {previewData.map(({ url, reason, file }) => (
      <Fragment key={url}>
        <ImgListItem
          onClick={() => {
            removePreviewImage(file.lastModified);
          }}
          img={url}
          reason={reason}
          ariaLabel={ariaLabel}
        />
      </Fragment>
    ))}
  </ul>
);

export default Preview;
