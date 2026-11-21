import { PDFDownloadLink, type DocumentProps } from '@react-pdf/renderer';
import type { ReactElement } from 'react';
import Button from './Button';

interface DownloadPdfBtnProps {
  document: ReactElement<DocumentProps>;
  fileName: string;
  label: string;
}

const DownloadPdfBtn = ({ document, fileName, label }: DownloadPdfBtnProps) => (
  <PDFDownloadLink document={document} fileName={fileName} className="pdf-link">
    {({ loading }) => (
      <Button variant="secondary" disabled={loading}>
        {loading ? 'Generating PDF...' : label}
      </Button>
    )}
  </PDFDownloadLink>
);

export default DownloadPdfBtn;
