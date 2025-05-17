// src/utils/formatCurrency.ts

/**
 * Cleans the input string to keep only digits.
 * @param inputValue The string to clean.
 * @returns A string containing only digits from the input.
 */
export const normalizeToKurusString = (inputValue: string): string => {
  if (typeof inputValue !== 'string') return '';
  return inputValue.replace(/[^0-9]/g, '');
};

/**
 * Formats a string of digits (representing kurus) into a TL currency string.
 * Example: "350000" (3500 TL * 100 kurus) becomes "3.500,00"
 * @param kurusString A string containing only digits (e.g., "12345" for 123,45 TL).
 * @returns A formatted TL string (e.g., "123,45") or "0,00" if input is invalid/empty.
 */
export const formatKurusToTlString = (kurusString: string): string => {
  const cleanKurusString = normalizeToKurusString(kurusString); 

  if (!cleanKurusString) {
    return '0,00'; 
  }

  // Pad with leading zeros if less than 3 digits to correctly place the decimal
  const paddedKurusString = cleanKurusString.padStart(3, '0');

  const integerPartStr = paddedKurusString.slice(0, -2);
  const decimalPartStr = paddedKurusString.slice(-2);

  // Handle cases where integerPartStr might be empty after slicing (e.g. input "50" -> padded "050" -> integer "0")
  const integerNum = parseInt(integerPartStr, 10); 
  
  const formattedIntegerPart = integerNum.toLocaleString('tr-TR');

  return `${formattedIntegerPart},${decimalPartStr}`;
};

/**
 * Converts a kurus string (e.g., "350000") to a TL number (e.g., 3500) for calculations.
 * @param kurusString A string containing only digits.
 * @returns TL value as a number.
 */
export const convertKurusStringToTlNumber = (kurusString: string): number => {
  const cleanKurusString = normalizeToKurusString(kurusString);
  if (!cleanKurusString) return 0;
  
  const kurusNum = parseInt(cleanKurusString, 10);
  if (isNaN(kurusNum)) return 0;
  
  return kurusNum / 100;
};
