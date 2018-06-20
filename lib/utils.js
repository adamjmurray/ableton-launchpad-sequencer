// modulo function that always returns a positive number
export const mod = (dividend, divisor) => {
  const value = dividend % divisor;
  return value >= 0 ? value : value + divisor;
};
