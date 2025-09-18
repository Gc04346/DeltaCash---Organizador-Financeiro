import React from 'react';
import { formatBRLCents, unmask } from '../utils/currencyUtils';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({ value, onChange, placeholder, className }: CurrencyInputProps) {
  // Convert numeric value to formatted display value
  const getDisplayValue = (numericValue: number): string => {
    if (numericValue === 0) return '';
    // Convert to cents and format
    const cents = Math.round(numericValue * 100).toString();
    return formatBRLCents(cents);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digits = unmask(inputValue);
    
    // Limit to reasonable number of digits (9 digits = up to 99,999.99)
    const limitedDigits = digits.length > 9 ? digits.slice(0, 9) : digits;
    
    if (!limitedDigits) {
      onChange(0);
      return;
    }
    
    // Convert cents to reais
    const numericValue = Number(limitedDigits) / 100;
    onChange(numericValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="\d*"
      value={getDisplayValue(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}