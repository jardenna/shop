function convertPrice(
  amountDKK: number,
  currency: string,
  rates: Record<string, number>,
) {
  return currency === 'DKK'
    ? amountDKK.toFixed(2)
    : (amountDKK * rates[currency]).toFixed(2);
}
export default convertPrice;
