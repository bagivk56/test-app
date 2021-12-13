import { store } from "../store/store";
import english from "../assets/lang/en-EN";
import svenska from "../assets/lang/sv-SV";
import espanol from "../assets/lang/es-ES";
import russian from "../assets/lang/ru-RU";

const dictionaries = {
  "ru-RU": russian,
  "en-EN": english,
  "sv-SV": svenska,
  "es-ES": espanol,
};

const allTranslations = (key, props) => {
  const { globalState } = store.getState();
  const { language } = globalState;

  if (!key) {
    return "key-not-found"
  }

  const wordbook = dictionaries[language];
  const defaultWordbook = dictionaries["ru-RU"];

  let message = getText(key, wordbook, defaultWordbook);

  if (!props) {
    return message
  }

  Object.keys((props)).map((key) => {
    message = message.replace(`{{${key}}}`, props[key]);
  });

  return message;
};
const getText = (key, wordbook, defaultWordbook) => {
  return key.replace(/\[([^\]]+)]/g, '.$1').split('.').reduce(function (o, p) {
    if (!o || !o[p]) {
      return key.replace(/\[([^\]]+)]/g, '.$1').split('.').reduce(function (o, p) {
        if (!o || !o[p]) {
          return key
        }

        return o[p];
      }, defaultWordbook)
    }

    return o[p];
  }, wordbook);
}

export default allTranslations;
