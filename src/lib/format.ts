/**
 * Format a price in paise (smallest currency unit) to a display string in INR.
 * Shopify stores prices in paise — divide by 100 for rupees.
 */
export const formatPrice = (pricePaise: number): string => {
  if (pricePaise == null || isNaN(pricePaise)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pricePaise / 100);
};
