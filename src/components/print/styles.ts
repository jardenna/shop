import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 12,
  },
  header: {
    padding: 40,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
});
