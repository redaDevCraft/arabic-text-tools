import { toLatinDigits } from './digits';
import { normalizeArabic } from './normalize';
import type { TransliterateArabicOptions } from '../types';

const map: Record<string, string> = {
  ا: 'a',
  ب: 'b',
  ت: 't',
  ث: 'th',
  ج: 'j',
  ح: 'h',
  خ: 'kh',
  د: 'd',
  ذ: 'dh',
  ر: 'r',
  ز: 'z',
  س: 's',
  ش: 'sh',
  ص: 's',
  ض: 'd',
  ط: 't',
  ظ: 'z',
  ع: 'a',
  غ: 'gh',
  ف: 'f',
  ق: 'q',
  ك: 'k',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ه: 'h',
  و: 'w',
  ي: 'y',
  ء: "'",
  ؤ: 'w',
  ئ: 'y',
  ة: 'a',
  ى: 'a',
};

export function transliterateArabic(text: string, options: TransliterateArabicOptions = {}): string {
  const normalized = normalizeArabic(text, {
    removeDiacritics: true,
    removeTatweel: true,
    normalizeAlif: true,
    normalizeYa: true,
    normalizeTaMarbuta: false,
    normalizeHamza: false,
    removeZeroWidth: true,
    removeBidiMarks: true,
    collapseWhitespace: true,
  });
  const sep = options.separator ?? '';
  const parts = Array.from(normalized).map((ch) => {
    if (/\d/.test(ch)) return options.preserveDigits ? ch : toLatinDigits(ch);
    if (ch === 'ة') return options.mapTaMarbuta === 't' ? 't' : options.mapTaMarbuta === 'ah' ? 'ah' : 'a';
    if (ch === 'ء') return options.mapHamza === 'h' ? 'h' : "'";
    return map[ch] ?? ch;
  });
  return parts.join(sep).replace(/\s+/g, ' ').trim();
}
