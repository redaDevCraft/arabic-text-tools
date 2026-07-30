import { ARABIC_INDIC_DIGITS } from './constants';

const LATIN = '0123456789';
const EASTERN = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN = '۰۱۲۳۴۵۶۷۸۹';

export function toArabicDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => EASTERN[LATIN.indexOf(d)]);
}

export function toLatinDigits(value: string | number): string {
  return String(value).replace(ARABIC_INDIC_DIGITS, (d) => {
    const easternIndex = EASTERN.indexOf(d);
    if (easternIndex >= 0) return LATIN[easternIndex];
    const persianIndex = PERSIAN.indexOf(d);
    if (persianIndex >= 0) return LATIN[persianIndex];
    return d;
  });
}
