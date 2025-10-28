import ImgListItem from './ImgListItem';

export type PreviewImg = {
  file: File;
  name: string;
  size: string;
  url: string;
  reason?: string;
};

export type PreviewProps = {
  ariaLabel: string;
  previewData: PreviewImg[];
  removePreviewImage: (lastModified: number) => void;
};

const Preview = ({
  removePreviewImage,
  ariaLabel,
  previewData,
}: PreviewProps) => (
  <ul className="img-list preview-list">
    {previewData.map(({ name, url, reason, file }) => (
      <div key={url}>
        <ImgListItem
          onClick={() => {
            removePreviewImage(file.lastModified);
          }}
          img={url}
          reason={reason}
          ariaLabel={`${ariaLabel} ${name}`}
        />
      </div>
    ))}
  </ul>
);

export default Preview;
