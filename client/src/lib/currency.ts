export function formatAUD(amount: number | string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
}

export function formatAUDCompact(amount: number | string): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (numAmount >= 1000000) {
    return `$${(numAmount / 1000000).toFixed(2)}M`;
  } else if (numAmount >= 1000) {
    return `$${(numAmount / 1000).toFixed(1)}K`;
  }
  
  return formatAUD(numAmount);
}
