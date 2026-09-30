import { Font } from '@react-pdf/renderer';

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
