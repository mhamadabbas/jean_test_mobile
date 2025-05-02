/**
 * Format a price to be displayed in the UI
 *
 * @param price - The price to format
 * @returns The formatted price
 */
export const formatPrice = (price?: number | string | null) => {
  if (!price) return '0'

  const priceNumber = typeof price === 'string' ? Number(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(priceNumber)
}