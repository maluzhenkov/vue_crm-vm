import localizeFileter from "@/filters/localize.filter";

export default {
  install(Vue) {
    Vue.prototype.$title = titleKey => {
      const appName = process.env.VUE_APP_TITLE || "My CRM";
      return `${localizeFileter(titleKey)} | ${appName}`;
    };
  }
};
