import { useEffect, useState } from 'react';
import variables from '../scss/variables.module.scss';

const stripUnit = (value: string): number =>
  parseFloat(value.replace(/rem$/, ''));

// variables
const mq = {
  mini: stripUnit(variables.mini) * 16,
  small: stripUnit(variables.small) * 16,
  medium: stripUnit(variables.medium) * 16,
  large: stripUnit(variables.large) * 16,
};

export const useMediaQuery = (
  smallMobileSize = mq.mini,
  mobileSize = mq.small,
  tabletSize = mq.medium,
  largeTabletSize = mq.large,
) => {
  const getMatches = () => ({
    isSmallMobileSize: window.matchMedia(`(max-width: ${smallMobileSize}px)`)
      .matches,
    isMobileSize: window.matchMedia(`(max-width: ${mobileSize}px)`).matches,
    isTabletSize: window.matchMedia(`(max-width: ${tabletSize}px)`).matches,
    isLargeTabletSize: window.matchMedia(`(max-width: ${largeTabletSize}px)`)
      .matches,
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
    const largeTabletQuery = window.matchMedia(
      `(max-width: ${largeTabletSize}px)`,
    );

    // add listeners
    smallMobileQuery.addEventListener('change', updateMatches);
    mobileQuery.addEventListener('change', updateMatches);
    tabletQuery.addEventListener('change', updateMatches);
    largeTabletQuery.addEventListener('change', updateMatches);

    // cleanup
    return () => {
      smallMobileQuery.removeEventListener('change', updateMatches);
      mobileQuery.removeEventListener('change', updateMatches);
      tabletQuery.removeEventListener('change', updateMatches);
      largeTabletQuery.removeEventListener('change', updateMatches);
    };
  }, [smallMobileSize, mobileSize, tabletSize, largeTabletSize]);

  return matches;
};
