import { ARABIC_DIACRITICS, BIDI_MARKS, TATWEEL, ZERO_WIDTH } from './constants';
import type { NormalizeArabicOptions } from '../types';

const DEFAULTS: Required<NormalizeArabicOptions> = {
  removeDiacritics: true,
  removeTatweel: true,
  normalizeAlif: true,
  normalizeYa: true,
  normalizeTaMarbuta: false,
  normalizeHamza: true,
  removeZeroWidth: true,
  removeBidiMarks: true,
  collapseWhitespace: true,
};

export function stripDiacritics(text: string): string {
  return text.replace(ARABIC_DIACRITICS, '');
}

function normalizeChars(text: string, options: Required<NormalizeArabicOptions>): string {
  let out = text;
  if (options.removeZeroWidth) out = out.replace(ZERO_WIDTH, '');
  if (options.removeBidiMarks) out = out.replace(BIDI_MARKS, '');
  if (options.removeDiacritics) out = stripDiacritics(out);
  if (options.removeTatweel) out = out.replace(TATWEEL, '');
  if (options.normalizeAlif) out = out
    .replace(/[\u0622\u0623\u0624\u0625\u0671]/g, 'ا')
    .replace(/[\u0672\u0673\u0675]/g, 'ا');
  if (options.normalizeYa) out = out.replace(/\u0649/g, 'ي');
  if (options.normalizeTaMarbuta) out = out.replace(/\u0629/g, 'ه');
  if (options.normalizeHamza) out = out
    .replace(/[\u0624]/g, 'و')
    .replace(/[\u0626]/g, 'ي')
    .replace(/[\u0621]/g, 'ء');
  if (options.collapseWhitespace) out = out.replace(/\s+/g, ' ').trim();
  return out;
}

export function normalizeArabic(text: string, options: NormalizeArabicOptions = {}): string {
  return normalizeChars(text, { ...DEFAULTS, ...options });
}

export function normalizeForSearch(text: string, options: NormalizeArabicOptions = {}): string {
  return normalizeArabic(text, {
    removeDiacritics: true,
    removeTatweel: true,
    normalizeAlif: true,
    normalizeYa: true,
    normalizeTaMarbuta: true,
    normalizeHamza: true,
    removeZeroWidth: true,
    removeBidiMarks: true,
    collapseWhitespace: true,
    ...options,
  });
}
