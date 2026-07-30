import { ARABIC_LETTERS_RE } from './constants';

export function detectDirection(text: string): 'rtl' | 'ltr' {
  return ARABIC_LETTERS_RE.test(text) ? 'rtl' : 'ltr';
}
