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
    fontSize: 30,
    textBox: 'trim-both cap alphabetic',
  },
  section: {
    marginBottom: 16,
  },
});
