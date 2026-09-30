import { BlobProvider } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import PrintAdminOrder from './PrintAdminOrder';

interface PdfPreviewProps {
  language: Record<string, string>;
  order: OrderResponse;
  selectedLanguage: SelectedLanguage;
}

const PdfPreview = ({ order, selectedLanguage, language }: PdfPreviewProps) => (
  <BlobProvider
    document={
      <PrintAdminOrder
        order={order}
        selectedLanguage={selectedLanguage}
        language={language}
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
