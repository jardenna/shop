import { Font, StyleSheet } from '@react-pdf/renderer';

import outfitMedium from './fonts/Outfit-Medium.ttf';
import outfitRegular from './fonts/Outfit-Regular.ttf';
import outfitSemiBold from './fonts/Outfit-SemiBold.ttf';

Font.register({
  family: 'Outfit',
  fonts: [
    {
      src: outfitRegular,
      fontWeight: 400,
    },
    {
      src: outfitMedium,
      fontWeight: 500,
    },
    {
      src: outfitSemiBold,
      fontWeight: 600,
    },
  ],
});

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
