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

export { getStarsArray };
