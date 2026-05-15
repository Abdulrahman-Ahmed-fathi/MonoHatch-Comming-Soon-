import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import ar from "./ar";

export const LANGUAGE_STORAGE_KEY = "mono-hatch-lang";
export type AppLanguage = "en" | "ar";

export const getStoredLanguage = (): AppLanguage => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
};

export const setStoredLanguage = (lang: AppLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

export const applyDocumentLanguage = (lang: AppLanguage) => {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
};

const initialLanguage = getStoredLanguage();
applyDocumentLanguage(initialLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  const lang: AppLanguage = lng === "ar" ? "ar" : "en";
  setStoredLanguage(lang);
  applyDocumentLanguage(lang);
});

export default i18n;
