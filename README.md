# arabic-text-tools


- [العربية](#العربية)
- [English](#english)

# العربية

[![npm version](https://img.shields.io/npm/v/arabic-text-tools)](https://www.npmjs.com/package/arabic-text-tools)
[![CI](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml)

مكتبة TypeScript خفيفة لاعتماد أقل، مخصّصة لتطبيع النص العربي، والمطابقة في البحث، وتحويل الأرقام، واكتشاف الاتجاه، وتطبيع صوتي محدود.

### لماذا هذه المكتبة؟
غالبًا تحتاج التطبيقات العربية إلى مطابقة ثابتة عبر التشكيل، وأشكال الهمزة، والتطويل، وعلامات الاتجاه ثنائي الاتجاه، والأرقام العربية الهندية. توفّر `arabic-text-tools` أدوات صغيرة ودوال نقية لهذه المهام المتكررة من دون إدخال اعتمادات ثقيلة.

### التثبيت
```bash
npm install arabic-text-tools
```

### مثال سريع
```ts
import { normalizeForSearch, detectDirection, toArabicDigits } from 'arabic-text-tools';

normalizeForSearch('السَّلَامُ عَلَيْكُمْ');
// "السلام عليكم"

detectDirection('مرحبا');
// "rtl"

toArabicDigits(2025);
// "٢٠٢٥"
```

### ميزات الإصدار الأول
- تطبيع عربي لتنظيف آمن للعرض.
- تطبيع للبحث من أجل المقارنة والفهرسة.
- تحويل الأرقام العربية الهندية والفارسية.
- اكتشاف الاتجاه لدعم RTL/LTR.
- تطبيع صوتي محدود لحالات الاستخدام الشائعة عند المطوّرين.

### الواجهة البرمجية
- `normalizeArabic(text, options)` — تطبيع النص العربي مع إعدادات تنظيف قابلة للتخصيص.
- `stripDiacritics(text)` — إزالة الحركات وبعض العلامات القرآنية/العربية.
- `normalizeForSearch(text, options)` — تطبيع أكثر صرامة للمطابقة.
- `detectDirection(text)` — اكتشاف `rtl` أو `ltr`.
- `toArabicDigits(value)` — تحويل الأرقام 0–9 إلى أرقام عربية هندية.
- `toLatinDigits(value)` — تحويل الأرقام العربية الهندية أو الفارسية إلى أرقام لاتينية.
- `transliterateArabic(text, options)` — تطبيع صوتي محدود وبحذر مقصود.

### فلسفة التطبيع
لا توجد قاعدة واحدة شاملة لتطبيع العربية تناسب كل تطبيق. هذه الحزمة تفصل بين تنظيف آمن للعرض وتطبيع آمن للبحث، حتى تختار السلوك المناسب لاستخدامك.

### ملاحظات
- التحويل الصوتي محدود عمدًا في الإصدار الأول.
- قد يقلل `normalizeForSearch` من قابلية الاسترجاع العكسي.
- تختلف قواعد التطبيع العربية حسب المنطقة والمجال، لذلك تبقى الخيارات صريحة وواضحة.

### التطوير
```bash
npm install
npm test
npm run build
```

### الإصدار
استخدم Conventional Commits واصدر من `main` بعد نجاح CI.

### الترخيص
MIT — راجع [LICENSE](./LICENSE).

## English

[![npm version](https://img.shields.io/npm/v/arabic-text-tools)](https://www.npmjs.com/package/arabic-text-tools)
[![CI](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/redaDevCraft/arabic-text-tools/actions/workflows/ci.yml)

A dependency-light TypeScript library for Arabic text normalization, search matching, digit conversion, direction detection, and limited transliteration.

### Why this exists
Arabic apps often need consistent matching across diacritics, hamza forms, tatweel, bidi marks, and Arabic-Indic digits. `arabic-text-tools` gives you a small, pure-function toolkit for those repeated problems without pulling in heavy dependencies.

### Install
```bash
npm install arabic-text-tools
```

### Quick example
```ts
import { normalizeForSearch, detectDirection, toArabicDigits } from 'arabic-text-tools';

normalizeForSearch('السَّلَامُ عَلَيْكُمْ');
// "السلام عليكم"

detectDirection('مرحبا');
// "rtl"

toArabicDigits(2025);
// "٢٠٢٥"
```

### v1 features
- Arabic normalization for display-safe cleanup.
- Search normalization for comparisons and indexing.
- Arabic-Indic and Persian digit conversion.
- Direction detection for RTL/LTR handling.
- Limited transliteration for common developer use cases.

### API
- `normalizeArabic(text, options)` — normalize Arabic text with configurable cleanup.
- `stripDiacritics(text)` — remove harakat and Quranic/Arabic diacritics.
- `normalizeForSearch(text, options)` — aggressive normalization for matching.
- `detectDirection(text)` — detect `rtl` or `ltr`.
- `toArabicDigits(value)` — convert 0–9 to Arabic-Indic digits.
- `toLatinDigits(value)` — convert Arabic-Indic or Persian digits to Latin digits.
- `transliterateArabic(text, options)` — limited transliteration, intentionally conservative.

### Normalization philosophy
There is no single universal Arabic normalization rule for every app. This package separates display-safe cleanup from search-safe normalization so you can choose the right behavior for your use case.

### Caveats
- Transliteration is intentionally limited in v1.
- `normalizeForSearch` may reduce reversibility.
- Arabic normalization rules can vary by region and domain, so the options stay explicit.

### Development
```bash
npm install
npm test
npm run build
```

### Release
Use conventional commits and release from `main` after CI passes.

### License
MIT — see [LICENSE](./LICENSE).

---

#