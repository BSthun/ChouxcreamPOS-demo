import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			counter: require("./counter-en.json"),
		},
		th: {
			counter: require("./counter-th.json"),
		},
	},
	ns: ["counter"],
	whitelist: ["en", "th"],
	lng: "en",
	fallbackLng: "en",
	detection: {
		order: ["localStorage"],
		lookupLocalStorage: "lng",
		checkWhitelist: true,
	},
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
