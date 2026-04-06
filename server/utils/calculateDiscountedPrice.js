export const calculateDiscountedPrice = (priceValue, discountValue) => {
  // Validate input types and ranges
  if (
    typeof priceValue !== 'number' ||
    typeof discountValue !== 'number' ||
    discountValue < 0 ||
    discountValue > 100
  ) {
    const error = new Error('Invalid pricing data');
    error.name = 'PricingError';
    throw error;
  }

  // Calculate discounted price
  const result = priceValue - (priceValue * discountValue) / 100;

  // Round to nearest integer
  return Math.round(result);
};
