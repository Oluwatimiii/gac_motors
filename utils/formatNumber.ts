export function formatNumber(num: number | string): string {
  // Convert to number if it's a string
  const numValue = typeof num === 'string' ? parseFloat(num) : num;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return '0.00'; // or return some error indicator
  }

  const parts = numValue.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
