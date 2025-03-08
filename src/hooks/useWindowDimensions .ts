import { useEffect, useState } from 'react';
import variables from '../scss/variables.module.scss';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stripUnit = (value: string): number =>
    parseFloat(value.replace(/rem$/, ''));

  // variables
  const mq = {
    small: stripUnit(variables.small) * 16,
    medium: stripUnit(variables.medium) * 16,
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileSize = windowDimensions.width < mq.small;
  const isTabletSize = windowDimensions.width < mq.medium;

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobileSize,
    isTabletSize,
  };
};

export default useWindowDimensions;
