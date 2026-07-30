# arabic-text-tools

Dependency-light TypeScript utilities for Arabic text normalization, digit conversion, direction detection, and lightweight transliteration.

## What it solves
Arabic apps often need consistent text comparison, better search matching, digit conversion, and safer handling of RTL strings. This package focuses on practical developer needs with pure functions and stable defaults.

## v1 features
- `normalizeArabic`
- `stripDiacritics`
- `normalizeForSearch`
- `detectDirection`
- `toArabicDigits`
- `toLatinDigits`
- `transliterateArabic` (limited, documented)

## Install
```bash
npm install arabic-text-tools
```

## Quick start
```ts
import { normalizeForSearch, toArabicDigits } from 'arabic-text-tools';

normalizeForSearch('السَّلَامُ عَلَيْكُمْ');
// "السلام عليكم"

toArabicDigits(2025);
// "٢٠٢٥"
```

## Normalization philosophy
This library distinguishes between display-safe normalization and search-safe normalization. Search normalization is more aggressive and may reduce reversibility, so use it for indexing and matching rather than storage.

## Caveats
- Transliteration is intentionally limited in v1.
- Some Arabic letter mappings are configurable because there is no single universal transliteration standard.
- Use `normalizeForSearch` carefully when exact original text must be preserved.

## Build and publish
1. Run tests and lint.
2. Build ESM, CJS, and types.
3. Verify package exports.
4. Publish under semantic versioning.

## API
See inline TypeScript types in `src/types/index.ts`.
