import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Outfit',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
  },
});
