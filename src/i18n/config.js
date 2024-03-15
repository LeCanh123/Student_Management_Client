import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./translations/en.json";
import Japanese from "./translations/jp.json";
import Vietnamese from "./translations/vi.json";

const resources = {
  "🇺🇸 English (US)": {
    translation: English,
  },
  "🇯🇵 中文 (繁體)": {
    translation: Japanese,
  },
  "🇻🇳 Tiếng Việt": {
    translation: Vietnamese,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "🇺🇸 English (US)",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
