interface NormalizeArabicOptions {
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
interface TransliterateArabicOptions {
    preserveDigits?: boolean;
    separator?: string;
    mapTaMarbuta?: 'a' | 'ah' | 't';
    mapHamza?: 'apostrophe' | 'h';
}

declare function stripDiacritics(text: string): string;
declare function normalizeArabic(text: string, options?: NormalizeArabicOptions): string;
declare function normalizeForSearch(text: string, options?: NormalizeArabicOptions): string;

declare function detectDirection(text: string): 'rtl' | 'ltr';

declare function toArabicDigits(value: string | number): string;
declare function toLatinDigits(value: string | number): string;

declare function transliterateArabic(text: string, options?: TransliterateArabicOptions): string;

export { type NormalizeArabicOptions, type TransliterateArabicOptions, detectDirection, normalizeArabic, normalizeForSearch, stripDiacritics, toArabicDigits, toLatinDigits, transliterateArabic };
