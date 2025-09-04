import { differenceInCalendarDays } from 'date-fns';

export type StarType = 'full' | 'half' | 'empty';

const getStarsArray = (rating: number): StarType[] => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  // Default values
  let adjustedFullStars = fullStars;
  let hasHalfStar = false;

  // Decide half vs round up
  if (decimal >= 0.75) {
    adjustedFullStars += 1; // round up
  } else if (decimal >= 0.25) {
    hasHalfStar = true;
  }

  const emptyStars = 5 - adjustedFullStars - (hasHalfStar ? 1 : 0);

  return [
    ...Array<StarType>(adjustedFullStars).fill('full'),
    ...(hasHalfStar ? ['half' as StarType] : []),
    ...Array<StarType>(emptyStars).fill('empty'),
  ];
};
const getDaysAgo = (date: Date, language: Record<string, string>): string => {
  const days = differenceInCalendarDays(new Date(), date);

  if (days === 0) {
    return language.today;
  }
  if (days === 1) {
    return language.yesterday;
  }
  return `${days} ${language.daysAgo}`;
};

export { getDaysAgo, getStarsArray };
