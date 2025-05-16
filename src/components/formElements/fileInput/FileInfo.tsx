import useLanguage from '../../../features/language/useLanguage';

const FileInfo = () => {
  const { language } = useLanguage();
  return (
    <span className="file-info">
      <span>
        <strong>{language.filesSuported}: </strong>JPEG/JPG/PNG/WEBP/GIF
      </span>
      <span>
        <strong>{language.maximumFileSize}: </strong>1MB
      </span>
    </span>
  );
};

export default FileInfo;
