import { describe, expect, it } from 'vitest';
import { detectDirection, normalizeArabic, normalizeForSearch, stripDiacritics, toArabicDigits, toLatinDigits, transliterateArabic } from '../src';

describe('arabic-text-tools', () => {
  it('strips diacritics', () => {
    expect(stripDiacritics('السَّلَامُ')).toBe('السلام');
  });

  it('normalizes Arabic text', () => {
    expect(normalizeArabic('آلْـعَرَبِيَّةُ')).toBe('العربية');
  });

  it('normalizes for search', () => {
    expect(normalizeForSearch('ةىأإآؤئ')).toBe('هياااوي');
  });

  it('detects direction', () => {
    expect(detectDirection('hello')).toBe('ltr');
    expect(detectDirection('مرحبا')).toBe('rtl');
  });

  it('converts digits', () => {
    expect(toArabicDigits('2025')).toBe('٢٠٢٥');
    expect(toLatinDigits('٢٠٢٥')).toBe('2025');
  });

  it('transliterates in a limited form', () => {
    expect(transliterateArabic('السلام عليكم')).toBe('alsalamalaykum');
  });
});
