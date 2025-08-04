import ImgListItem from './ImgListItem';

export type PreviewImg = { name: string; size: string; url: string };

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
}: PreviewProps) => {
  console.log(previewData);

  return (
    <ul className="img-list preview-list">
      {previewData.map(({ name, url }) => (
        <ImgListItem
          key={url}
          onClick={() => {
            onRemoveImg(name);
          }}
          img={url}
          ariaLabel={`${ariaLabel} ${name}`}
          title={title}
        />
      ))}
    </ul>
  );
};

export default Preview;
