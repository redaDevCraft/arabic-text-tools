# arabic-text-tools

[![npm version](https://img.shields.io/npm/v/arabic-text-tools)](https://www.npmjs.com/package/arabic-text-tools)
[![CI](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml)

A dependency-light TypeScript library for Arabic text normalization, search matching, digit conversion, direction detection, and limited transliteration.

## Why this exists
Arabic apps often need consistent matching across diacritics, hamza forms, tatweel, bidi marks, and Arabic-Indic digits. `arabic-text-tools` gives you a small, pure-function toolkit for those repeated problems without pulling in heavy dependencies.

## Install
```bash
npm install arabic-text-tools
```

## Quick example
```ts
import { normalizeForSearch, detectDirection, toArabicDigits } from 'arabic-text-tools';

normalizeForSearch('السَّلَامُ عَلَيْكُمْ');
// "السلام عليكم"

detectDirection('مرحبا');
// "rtl"

toArabicDigits(2025);
// "٢٠٢٥"
```

## v1 features
- Arabic normalization for display-safe cleanup.
- Search normalization for comparisons and indexing.
- Arabic-Indic and Persian digit conversion.
- Direction detection for RTL/LTR handling.
- Limited transliteration for common developer use cases.

## API
- `normalizeArabic(text, options)` — normalize Arabic text with configurable cleanup.
- `stripDiacritics(text)` — remove harakat and Quranic/Arabic diacritics.
- `normalizeForSearch(text, options)` — aggressive normalization for matching.
- `detectDirection(text)` — detect `rtl` or `ltr`.
- `toArabicDigits(value)` — convert 0–9 to Arabic-Indic digits.
- `toLatinDigits(value)` — convert Arabic-Indic or Persian digits to Latin digits.
- `transliterateArabic(text, options)` — limited transliteration, intentionally conservative.

## Normalization philosophy
There is no single universal Arabic normalization rule for every app. This package separates display-safe cleanup from search-safe normalization so you can choose the right behavior for your use case.

## Caveats
- Transliteration is intentionally limited in v1.
- `normalizeForSearch` may reduce reversibility.
- Arabic normalization rules can vary by region and domain, so the options stay explicit.

## Development
```bash
npm install
npm test
npm run build
```

## Release
Use conventional commits and release from `main` after CI passes.

## License
MIT — see [LICENSE](./LICENSE).
