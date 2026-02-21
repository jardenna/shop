import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  isToday,
  isYesterday,
} from 'date-fns';

export type StarType = 'full' | 'half' | 'empty';

export const getStarsArray = (rating: number): StarType[] => {
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

export const getReviewAgeLabel = (
  reviewDate: Date,
  language: Record<string, string>,
): string => {
  if (isToday(reviewDate)) {
    return language.today;
  }

  if (isYesterday(reviewDate)) {
    return 'Yesterday';
  }

  const daysDifference = differenceInCalendarDays(new Date(), reviewDate);

  if (daysDifference < 30) {
    return `${daysDifference} ${language.daysAgo}`;
  }

  const monthsDifference = differenceInCalendarMonths(new Date(), reviewDate);

  if (monthsDifference < 12) {
    return `${monthsDifference} ${language.monthAgo}`;
  }

  const yearsDifference = differenceInCalendarYears(new Date(), reviewDate);

  return `${yearsDifference} ${language.yearsAgo}`;
};
