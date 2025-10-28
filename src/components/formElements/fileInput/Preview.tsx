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
  onRemoveImg: (file: File) => void;
};

const Preview = ({ onRemoveImg, ariaLabel, previewData }: PreviewProps) => (
  <ul className="img-list preview-list">
    {previewData.map(({ name, url, reason, file }) => (
      <div key={url}>
        <ImgListItem
          onClick={() => {
            onRemoveImg(file);
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
