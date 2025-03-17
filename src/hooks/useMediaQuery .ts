import { useEffect, useState } from 'react';
import variables from '../scss/variables.module.scss';

// const useMediaQuery = (query: string) => {
//   const stripUnit = (value: string): number =>
//     parseFloat(value.replace(/rem$/, ''));

//   // variables
//   const mq = {
//     small: stripUnit(variables.small) * 16,
//     medium: stripUnit(variables.medium) * 16,
//   };
//   console.log(mq);

//   const [matches, setMatches] = useState(
//     () => window.matchMedia(query).matches,
//   );

//   useEffect(() => {
//     const mediaQueryList = window.matchMedia(query);
//     const listener = (event: MediaQueryListEvent) => {
//       setMatches(event.matches);
//     };

//     mediaQueryList.addEventListener('change', listener);
//     return () => {
//       mediaQueryList.removeEventListener('change', listener);
//     };
//   }, [query]);

//   return matches;
// };

const stripUnit = (value: string): number =>
  parseFloat(value.replace(/rem$/, ''));

// variables
const mq = {
  small: stripUnit(variables.small) * 16,
  medium: stripUnit(variables.medium) * 16,
};

const useMediaQuery = (mobileSize = mq.small, tabletSize = mq.medium) => {
  const getMatches = () => ({
    isMobileSize: window.matchMedia(`(max-width: ${mobileSize}px)`).matches,
    isTabletSize: window.matchMedia(`(max-width: ${tabletSize}px)`).matches,
  });

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const updateMatches = () => {
      setMatches(getMatches());
    };
    const mobileQuery = window.matchMedia(`(max-width: ${mobileSize}px)`);
    const tabletQuery = window.matchMedia(`(max-width: ${tabletSize}px)`);

    mobileQuery.addEventListener('change', updateMatches);
    tabletQuery.addEventListener('change', updateMatches);

    return () => {
      mobileQuery.removeEventListener('change', updateMatches);
      tabletQuery.removeEventListener('change', updateMatches);
    };
  }, [mobileSize, tabletSize]);

  return matches;
};

export default useMediaQuery;
