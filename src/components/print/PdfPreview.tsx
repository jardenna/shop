import { BlobProvider } from '@react-pdf/renderer';
import { SelectedLanguage } from '../../features/language/languageSlice';
import PrintAdminOrder, { BasePrintOrderProps } from './PrintAdminOrder';

interface PdfPreviewProps extends BasePrintOrderProps {
  selectedLanguage: SelectedLanguage;
}

const PdfPreview = ({
  order,
  selectedLanguage,
  language,
  rates,
}: PdfPreviewProps) => (
  <BlobProvider
    document={
      <PrintAdminOrder
        order={order}
        selectedLanguage={selectedLanguage}
        language={language}
        rates={rates}
      />
    }
  >
    {({ url, loading, error }) => {
      if (loading) {
        return <p>Generating PDF...</p>;
      }

      if (error || !url) {
        return <p>Could not generate PDF.</p>;
      }

      return (
        <iframe src={url} title="Order PDF preview" className="pdf-preview" />
      );
    }}
  </BlobProvider>
);

export default PdfPreview;
