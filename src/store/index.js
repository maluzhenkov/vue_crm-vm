import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import record from "./record";
import category from "./category";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_CURRATE;
      // return await fetch(
      //   `https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB&key=${key}`,
      //   { mode: "no-cors" }
      // ).then(res => res.json());
      return {
        status: 200,
        message: "rates",
        data: { USDRUB: "62.8431", EURRUB: "69.8815", RUBRUB: "1" }
      };
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    category,
    record,
    auth,
    info
  }
});
