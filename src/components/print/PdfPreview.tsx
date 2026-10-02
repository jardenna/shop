import { BlobProvider } from '@react-pdf/renderer';
import PrintAdminOrder, { BasePrintOrderProps } from './PrintAdminOrder';

const PdfPreview = ({ order, language, rates }: BasePrintOrderProps) => (
  <BlobProvider
    document={
      <PrintAdminOrder order={order} language={language} rates={rates} />
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
