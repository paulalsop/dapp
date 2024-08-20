import { createI18n } from "vue-i18n";

import zh from "./zh";
import en from "./en";
import ko from "./ko";
import th from "./th";

const messages = {
    zh,
    en,
    ko,
    th
};
const i18n = createI18n({
    messages,
    legacy: false,
    globalInjection: true,
    locale: "en",
    fallbackLocale: 'en', 
});
export default i18n;