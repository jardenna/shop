import ImgListItem from './ImgListItem';

export type PreviewImg = {
  name: string;
  size: string;
  url: string;
  reason?: string;
};

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
  <ul className="img-list preview-list">
    {previewData.map(({ name, url, reason }) => (
      <div key={url}>
        <ImgListItem
          onClick={() => {
            onRemoveImg(name);
          }}
          img={url}
          reason={reason}
          ariaLabel={`${ariaLabel} ${name}`}
          title={title}
        />
      </div>
    ))}
  </ul>
);

export default Preview;
