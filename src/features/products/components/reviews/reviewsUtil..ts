import { differenceInCalendarDays } from 'date-fns';

export type StarType = 'full' | 'half' | 'empty';

const getStarsArray = (rating: number): StarType[] => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalfStar = decimal >= 0.25 && decimal < 0.76;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return [
    ...Array.from({ length: fullStars }, () => 'full' as const),
    ...(hasHalfStar ? ['half' as const] : []),
    ...Array.from({ length: emptyStars }, () => 'empty' as const),
  ];
};

const getDaysAgo = (date: Date): string => {
  const days = differenceInCalendarDays(new Date(), date);

  if (days === 0) {
    return 'Today';
  }
  if (days === 1) {
    return 'Yesterday';
  }
  return `${days} days ago`;
};

export { getDaysAgo, getStarsArray };
