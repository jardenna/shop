import { PDFDownloadLink, type DocumentProps } from '@react-pdf/renderer';
import { ReactElement } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';

interface PdfDownloadButtonProps {
  document: ReactElement<DocumentProps>;
  fileName: string;
  label: string;
}

const PdfDownloadButton = ({
  document,
  fileName,
  label,
}: PdfDownloadButtonProps) => (
  <PDFDownloadLink document={document} fileName={fileName} className="pdf-link">
    {({ loading }) => (
      <Button variant={BtnVariant.Secondary} disabled={loading}>
        {loading ? 'Generating PDF...' : label}
      </Button>
    )}
  </PDFDownloadLink>
);

export default PdfDownloadButton;
