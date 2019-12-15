import store from "../store";
import ru from "../locales/ru.json";
import en from "../locales/en.json";

const locales = {
  "ru-RU": ru,
  "en-US": en
};

export default {
  bind(el, { value }) {
    const locale = store.getters.info.locale || "ru-RU";
    M.Tooltip.init(el, { html: locales[locale][value] || value });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};
