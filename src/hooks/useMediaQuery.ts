import { useEffect, useState } from 'react';
import variables from '../scss/variables.module.scss';

const stripUnit = (value: string): number =>
  parseFloat(value.replace(/rem$/, ''));

// variables
const mq = {
  mini: stripUnit(variables.mini) * 16,
  small: stripUnit(variables.small) * 16,
  medium: stripUnit(variables.medium) * 16,
};

const useMediaQuery = (
  smallMobileSize = mq.mini,
  mobileSize = mq.small,
  tabletSize = mq.medium,
) => {
  const getMatches = () => ({
    isSmallMobileSize: window.matchMedia(`(max-width: ${smallMobileSize}px)`)
      .matches,
    isMobileSize: window.matchMedia(`(max-width: ${mobileSize}px)`).matches,
    isTabletSize: window.matchMedia(`(max-width: ${tabletSize}px)`).matches,
  });

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const updateMatches = () => {
      setMatches(getMatches());
    };

    // create queries for all breakpoints
    const smallMobileQuery = window.matchMedia(
      `(max-width: ${smallMobileSize}px)`,
    );
    const mobileQuery = window.matchMedia(`(max-width: ${mobileSize}px)`);
    const tabletQuery = window.matchMedia(`(max-width: ${tabletSize}px)`);

    // add listeners
    smallMobileQuery.addEventListener('change', updateMatches);
    mobileQuery.addEventListener('change', updateMatches);
    tabletQuery.addEventListener('change', updateMatches);

    // cleanup
    return () => {
      smallMobileQuery.removeEventListener('change', updateMatches);
      mobileQuery.removeEventListener('change', updateMatches);
      tabletQuery.removeEventListener('change', updateMatches);
    };
  }, [smallMobileSize, mobileSize, tabletSize]);

  return matches;
};

export default useMediaQuery;
