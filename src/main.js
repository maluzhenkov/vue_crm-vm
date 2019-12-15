import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import tooltipDerective from "@/directives/tooltip.directive";
import localizeFilter from "@/filters/localize.filter";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import toastMessage from "@/utils/toast.message";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.use(toastMessage);
Vue.directive("tooltip", tooltipDerective);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyAd4uDQXR3JhlimNcRcJ7KiYa0h0D4ep1Q",
  authDomain: "crm-vue-81249.firebaseapp.com",
  databaseURL: "https://crm-vue-81249.firebaseio.com",
  projectId: "crm-vue-81249",
  storageBucket: "crm-vue-81249.appspot.com",
  messagingSenderId: "856087491764",
  appId: "1:856087491764:web:513a9234786188c34f13e1"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
