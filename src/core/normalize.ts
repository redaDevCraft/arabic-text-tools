import { ARABIC_DIACRITICS, ARABIC_SEARCH_SAFE_CHARS, BIDI_MARKS, TATWEEL, ZERO_WIDTH } from './constants';
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

export function normalizeArabicLetters(text: string, options: Required<NormalizeArabicOptions>): string {
  let out = text;
  if (options.removeZeroWidth) out = out.replace(ZERO_WIDTH, '');
  if (options.removeBidiMarks) out = out.replace(BIDI_MARKS, '');
  if (options.removeDiacritics) out = stripDiacritics(out);
  if (options.removeTatweel) out = out.replace(TATWEEL, '');
  if (options.normalizeAlif) out = out
    .replace(/[\u0622\u0623\u0625\u0671]/g, 'ا')
    .replace(/[\u0672\u0673\u0675]/g, 'ا');
  if (options.normalizeYa) out = out.replace(/\u0649/g, 'ي');
  if (options.normalizeTaMarbuta) out = out.replace(/\u0629/g, 'ه');
  if (options.normalizeHamza) out = out
    .replace(/[\u0624]/g, 'و')
    .replace(/[\u0626]/g, 'ي')
    .replace(/[\u0621]/g, 'ء');
  return out;
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function normalizeArabic(text: string, options: NormalizeArabicOptions = {}): string {
  const merged = { ...DEFAULTS, ...options };
  const normalized = normalizeArabicLetters(text, merged);
  return merged.collapseWhitespace ? collapseWhitespace(normalized) : normalized;
}

export function normalizeForSearch(text: string, options: NormalizeArabicOptions = {}): string {
  const normalized = normalizeArabic(text, {
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
  return normalized.replace(ARABIC_SEARCH_SAFE_CHARS, '');
}
