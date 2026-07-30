export interface NormalizeArabicOptions {
  removeDiacritics?: boolean;
  removeTatweel?: boolean;
  normalizeAlif?: boolean;
  normalizeYa?: boolean;
  normalizeTaMarbuta?: boolean;
  normalizeHamza?: boolean;
  removeZeroWidth?: boolean;
  removeBidiMarks?: boolean;
  collapseWhitespace?: boolean;
}

export interface TransliterateArabicOptions {
  preserveDigits?: boolean;
  separator?: string;
  mapTaMarbuta?: 'a' | 'ah' | 't';
  mapHamza?: 'apostrophe' | 'h';
}
