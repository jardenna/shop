import { BlobProvider } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import PrintAdminOrder from './PrintAdminOrder';

interface PdfPreviewProps {
  order: OrderResponse;
}

const PdfPreview = ({ order }: PdfPreviewProps) => (
  <BlobProvider document={<PrintAdminOrder order={order} />}>
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
