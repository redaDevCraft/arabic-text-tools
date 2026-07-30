"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  detectDirection: () => detectDirection,
  normalizeArabic: () => normalizeArabic,
  normalizeForSearch: () => normalizeForSearch,
  stripDiacritics: () => stripDiacritics,
  toArabicDigits: () => toArabicDigits,
  toLatinDigits: () => toLatinDigits,
  transliterateArabic: () => transliterateArabic
});
module.exports = __toCommonJS(index_exports);

// src/core/constants.ts
var ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
var TATWEEL = /\u0640/g;
var ZERO_WIDTH = /[\u200B\u200C\u200D\uFEFF]/g;
var BIDI_MARKS = /[\u200E\u200F\u061C\u202A-\u202E\u2066-\u2069]/g;
var ARABIC_INDIC_DIGITS = /[\u0660-\u0669\u06F0-\u06F9]/g;
var ARABIC_LETTERS_RE = /[\u0600-\u06FF]/;
var ARABIC_SEARCH_SAFE_CHARS = /[^\p{L}\p{N}\s]/gu;

// src/core/normalize.ts
var DEFAULTS = {
  removeDiacritics: true,
  removeTatweel: true,
  normalizeAlif: true,
  normalizeYa: true,
  normalizeTaMarbuta: false,
  normalizeHamza: true,
  removeZeroWidth: true,
  removeBidiMarks: true,
  collapseWhitespace: true
};
function stripDiacritics(text) {
  return text.replace(ARABIC_DIACRITICS, "");
}
function normalizeArabicLetters(text, options) {
  let out = text;
  if (options.removeZeroWidth) out = out.replace(ZERO_WIDTH, "");
  if (options.removeBidiMarks) out = out.replace(BIDI_MARKS, "");
  if (options.removeDiacritics) out = stripDiacritics(out);
  if (options.removeTatweel) out = out.replace(TATWEEL, "");
  if (options.normalizeAlif) out = out.replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627").replace(/[\u0672\u0673\u0675]/g, "\u0627");
  if (options.normalizeYa) out = out.replace(/\u0649/g, "\u064A");
  if (options.normalizeTaMarbuta) out = out.replace(/\u0629/g, "\u0647");
  if (options.normalizeHamza) out = out.replace(/[\u0624]/g, "\u0648").replace(/[\u0626]/g, "\u064A").replace(/[\u0621]/g, "\u0621");
  return out;
}
function collapseWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}
function normalizeArabic(text, options = {}) {
  const merged = { ...DEFAULTS, ...options };
  const normalized = normalizeArabicLetters(text, merged);
  return merged.collapseWhitespace ? collapseWhitespace(normalized) : normalized;
}
function normalizeForSearch(text, options = {}) {
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
    ...options
  });
  return normalized.replace(ARABIC_SEARCH_SAFE_CHARS, "");
}

// src/core/direction.ts
function detectDirection(text) {
  return ARABIC_LETTERS_RE.test(text) ? "rtl" : "ltr";
}

// src/core/digits.ts
var LATIN = "0123456789";
var EASTERN = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
var PERSIAN = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
function toArabicDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => EASTERN[LATIN.indexOf(d)]);
}
function toLatinDigits(value) {
  return String(value).replace(ARABIC_INDIC_DIGITS, (d) => {
    const easternIndex = EASTERN.indexOf(d);
    if (easternIndex >= 0) return LATIN[easternIndex];
    const persianIndex = PERSIAN.indexOf(d);
    if (persianIndex >= 0) return LATIN[persianIndex];
    return d;
  });
}

// src/core/transliterate.ts
var map = {
  \u0627: "a",
  \u0628: "b",
  \u062A: "t",
  \u062B: "th",
  \u062C: "j",
  \u062D: "h",
  \u062E: "kh",
  \u062F: "d",
  \u0630: "dh",
  \u0631: "r",
  \u0632: "z",
  \u0633: "s",
  \u0634: "sh",
  \u0635: "s",
  \u0636: "d",
  \u0637: "t",
  \u0638: "z",
  \u0639: "a",
  \u063A: "gh",
  \u0641: "f",
  \u0642: "q",
  \u0643: "k",
  \u0644: "l",
  \u0645: "m",
  \u0646: "n",
  \u0647: "h",
  \u0648: "w",
  \u064A: "y",
  \u0621: "'",
  \u0624: "w",
  \u0626: "y",
  \u0629: "a",
  \u0649: "a"
};
function transliterateArabic(text, options = {}) {
  const normalized = normalizeArabic(text, {
    removeDiacritics: true,
    removeTatweel: true,
    normalizeAlif: true,
    normalizeYa: true,
    normalizeTaMarbuta: false,
    normalizeHamza: false,
    removeZeroWidth: true,
    removeBidiMarks: true,
    collapseWhitespace: true
  });
  const sep = options.separator ?? "";
  const parts = Array.from(normalized).map((ch) => {
    if (/\d/.test(ch)) return options.preserveDigits ? ch : toLatinDigits(ch);
    if (ch === "\u0629") return options.mapTaMarbuta === "t" ? "t" : options.mapTaMarbuta === "ah" ? "ah" : "a";
    if (ch === "\u0621") return options.mapHamza === "h" ? "h" : "'";
    return map[ch] ?? ch;
  });
  return parts.join(sep).replace(/\s+/g, " ").trim();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectDirection,
  normalizeArabic,
  normalizeForSearch,
  stripDiacritics,
  toArabicDigits,
  toLatinDigits,
  transliterateArabic
});
