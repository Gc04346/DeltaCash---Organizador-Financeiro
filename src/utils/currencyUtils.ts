export function formatBRLCents(digits: string): string {
  // digits: só 0–9; interpreta como centavos
  if (!digits) return "";
  const n = Number(digits) / 100; // seguro para nossos casos de orçamento
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function unmask(value: string): string {
  return value.replace(/\D/g, "");
}

export function parseCurrencyInput(value: string): number {
  if (!value) return 0;
  
  // Remove currency formatting and convert to number
  const numericValue = value
    .replace(/\./g, '') // Remove thousands separator
    .replace(',', '.'); // Replace comma with dot for decimal
  
  return parseFloat(numericValue) || 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}