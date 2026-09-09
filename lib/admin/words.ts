/**
 * Amount in words, in the Indian system — lakh and crore rather than million.
 *
 * A tax invoice carries the total in words as a check against the figures, so
 * this has to agree with the number beside it exactly: same rounding, and paise
 * spelled out rather than dropped.
 */
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

/** 0–99. */
function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = TENS[Math.floor(n / 10)];
  const o = ONES[n % 10];
  return o ? `${t} ${o}` : t;
}

/** 0–999. */
function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} Hundred`);
  if (rest) parts.push(h ? `and ${twoDigits(rest)}` : twoDigits(rest));
  return parts.join(" ");
}

/** Whole rupees in words, grouped crore / lakh / thousand / hundred. */
function rupeesInWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return parts.join(" ");
}

/**
 * "Eight Thousand Eight Hundred and Ninety Eight Rupees Only", uppercased by
 * the invoice. Paise are named when present so the words cannot quietly
 * disagree with a total that carries them.
 */
export function amountInWords(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const rupees = Math.floor(rounded);
  const paise = Math.round((rounded - rupees) * 100);
  const head = `${rupeesInWords(rupees)} Rupees`;
  return paise > 0
    ? `${head} and ${twoDigits(paise)} Paise Only`
    : `${head} Only`;
}
