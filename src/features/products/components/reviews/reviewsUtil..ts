export type StarType = 'full' | 'half' | 'empty';

const getStarsArray = (rating: number): StarType[] => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Build stars array without loops, using Array.from
  return [
    ...Array.from({ length: fullStars }, () => 'full' as const),
    ...(hasHalfStar ? ['half' as const] : []),
    ...Array.from({ length: emptyStars }, () => 'empty' as const),
  ];
};

const getHalfStarArray = (rating: number, stars: number[]) => {
  stars.map((star) => {
    const diff = rating - star;
    if (diff > 0.75) {
      return 'full';
    }
    if (diff >= 0.25) {
      return 'half';
    }
    return 'empty';
  });
};

export { getHalfStarArray, getStarsArray };
